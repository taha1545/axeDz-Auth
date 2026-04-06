const { Auth, WelcomeMail, SmsOtp, OtpService, TokenSession } = require("../app/Services");
const { UserResource } = require("../app/Resource");
const { AuthError, NotFoundError } = require("../app/Error");
const db = require("../db/models");
const bcrypt = require("bcrypt");

const signUp = async (req, res) => {
  const { name, email, phone, password } = req.body;
  const imagePath = req.file ? req.file.path : null;
  const hashedPassword = await bcrypt.hash(password, 10);
  //
  const user = await db.User.create({
    name,
    email,
    phone: phone || null,
    password: hashedPassword,
    imagePath,
    is_verified: false,
  });
  //
  const { accessToken, refreshToken } = TokenSession.createTokens(user);
  TokenSession.setRefreshCookie(res, refreshToken);
  //
  WelcomeMail.sendMail(user.email).catch((err) => {
    console.error("Welcome email failed:", err.message);
  });
  // 
  if (phone) {
    const { otpCode } = await OtpService.createOtpRecord({
      db,
      userId: user.id,
      type: "verifySms",
    });
    SmsOtp.send(phone, otpCode);
  }
  //
  return res.status(201).json({
    success: true,
    message: "User created successfully. Please verify your phone if provided.",
    data: UserResource(user),
    accessToken,
  });
};

const login = async (req, res) => {
  const { identifier, password } = req.body;
  const user = await db.User.findOne({
    where: {
      [db.Sequelize.Op.or]: [
        { email: identifier },
        { phone: identifier }
      ]
    }
  });
  if (!user) {
    throw new NotFoundError("User not found with this email or phone");
  }
  //
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new AuthError("Invalid password");
  }
  //
  const { accessToken, refreshToken } = TokenSession.createTokens(user);
  TokenSession.setRefreshCookie(res, refreshToken);
  //
  return res.status(200).json({
    success: true,
    message: "User logged in successfully",
    data: UserResource(user),
    accessToken,
  });
};

//
const sendResetOtp = async (req, res) => {
  const { email } = req.body;
  const user = await db.User.findOne({ where: { email } });
  if (!user) {
    throw new NotFoundError("No user found with this email");
  }
  //
  const { otpCode } = await OtpService.createOtpRecord({
    db,
    userId: user.id,
    type: "resetPassword",
  });
  const OtpMail = require("../app/Services/OtpMail");
  await OtpMail.sendOtp(user.email, otpCode);
  //
  return res.status(200).json({
    success: true,
    message: "Reset OTP has been sent to your email",
  });
};

const resetPasswordWithOtp = async (req, res) => {
  const { email, otp_code, password } = req.body;
  const user = await db.User.findOne({ where: { email } });
  if (!user) {
    throw new NotFoundError("No user found with this email");
  }

  const otpRecord = await OtpService.getValidOtpRecord({
    db,
    userId: user.id,
    otpCode: otp_code,
    type: "resetPassword",
  });

  user.password = await bcrypt.hash(password, 10);
  await user.save();
  await OtpService.markOtpUsed(otpRecord);

  return res.status(200).json({
    success: true,
    message: "Password has been reset successfully",
  });
};

const resetPassword = async (req, res) => {
  const userId = req.user?.id;
  const { oldPassword, newPassword } = req.body;
  const user = await db.User.findByPk(userId);
  if (!user) {
    throw new NotFoundError("User not found");
  }

  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) {
    throw new AuthError("Old password is incorrect");
  }

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  return res.status(200).json({
    success: true,
    message: "Password updated successfully",
  });
};

const refreshAccessToken = async (req, res) => {
  const refreshToken = req.cookies?.refreshToken || req.body?.refreshToken;
  if (!refreshToken) {
    throw new AuthError("Refresh token is required");
  }

  const decoded = Auth.ValidateRefreshToken(refreshToken);
  const user = await db.User.findByPk(decoded.id);
  if (!user) {
    throw new NotFoundError("User not found");
  }

  const tokens = TokenSession.createTokens(user);
  TokenSession.setRefreshCookie(res, tokens.refreshToken);
  return res.status(200).json({
    success: true,
    message: "Access token refreshed",
    accessToken: tokens.accessToken,
  });
};

const logout = async (req, res) => {
  TokenSession.clearRefreshCookie(res);
  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

module.exports = {
  signUp,
  login,
  sendResetOtp,
  resetPasswordWithOtp,
  resetPassword,
  refreshAccessToken,
  logout,
};
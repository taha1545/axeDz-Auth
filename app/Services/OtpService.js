const crypto = require("crypto");
const AuthError = require("../Error/AuthError");

const OTP_EXP_MINUTES = Number(process.env.OTP_EXP_MINUTES || 15);

const createOtpCode = () => crypto.randomInt(100000, 999999).toString();
const otpExpiry = () => new Date(Date.now() + OTP_EXP_MINUTES * 60 * 1000);

const createOtpRecord = async ({ db, userId, type }) => {
  const otpCode = createOtpCode();
  const otpRecord = await db.UserOtp.create({
    user_id: userId,
    otp_code: otpCode,
    type,
    expires_at: otpExpiry(),
  });

  return { otpCode, otpRecord };
};

const getValidOtpRecord = async ({ db, userId, otpCode, type }) => {
  const otpRecord = await db.UserOtp.findOne({
    where: {
      user_id: userId,
      otp_code: otpCode,
      type,
      used_at: null,
    },
    order: [["created_at", "DESC"]],
  });
  if (!otpRecord) {
    throw new AuthError("Invalid OTP");
  }
  if (new Date() > new Date(otpRecord.expires_at)) {
    throw new AuthError("OTP has expired");
  }
  return otpRecord;
};

const markOtpUsed = async (otpRecord) => {
  otpRecord.used_at = new Date();
  await otpRecord.save();
};

module.exports = {
  createOtpRecord,
  getValidOtpRecord,
  markOtpUsed,
};

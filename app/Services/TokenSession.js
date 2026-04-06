const Auth = require("./Auth");

const createTokens = (user) => {
  const payload = { id: user.id };
  return {
    accessToken: Auth.CreateAccessToken(payload),
    refreshToken: Auth.CreateRefreshToken(payload),
  };
};

const setRefreshCookie = (res, refreshToken) => {
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: Number(process.env.REFRESH_COOKIE_MAX_AGE_MS || 30 * 24 * 60 * 60 * 1000),
  });
};

const clearRefreshCookie = (res) => {
  res.clearCookie("refreshToken");
};

module.exports = {
  createTokens,
  setRefreshCookie,
  clearRefreshCookie,
};

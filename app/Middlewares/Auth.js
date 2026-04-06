const { ValidateAccessToken } = require('../Services/Auth');
const AuthError = require('../Error/AuthError');


const checkAuth = (req, res, next) => {
  //
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new AuthError("No token provided"));
  }
  //
  const token = authHeader.split(" ")[1];
  try {
    const decoded = ValidateAccessToken(token);
    if (!decoded?.id) {
      throw new AuthError("Token missing required fields");
    }
    //
    req.user = { id: decoded.id };
    next();
  } catch (err) {
    next(new AuthError("Authentication failed: " + err.message));
  }
};



module.exports = {
  checkAuth
};

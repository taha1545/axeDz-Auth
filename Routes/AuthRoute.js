const express = require("express");
const Router = express.Router();

const { AuthController, UserController, VerifyController } = require('../Controllers');
const Upload = require('../app/Services/Storage');
const { Auth } = require('../app/Middlewares');
const { UserValidator, ContactValidator } = require('../app/Validators');
const { validate } = require('../app/Middlewares');
const Security = require('../app/Middlewares/Security');

//
Router.post('/signup', Security.authLimiter, Upload.single('image'), UserValidator.signupValidation, validate, AuthController.signUp);

Router.post('/login', Security.authLimiter, Security.bruteForceDelay, UserValidator.loginValidation, validate, AuthController.login);

Router.post('/send-reset-otp', Security.authLimiter, UserValidator.sendResetOtpValidation, validate, AuthController.sendResetOtp);

Router.put('/reset-password-otp', Security.authLimiter, UserValidator.resetPasswordWithOtpValidation, validate, AuthController.resetPasswordWithOtp);

Router.patch('/reset-password', Auth.checkAuth, UserValidator.updatePasswordValidation, validate, AuthController.resetPassword);
Router.post('/refresh-token', UserValidator.refreshTokenValidation, validate, AuthController.refreshAccessToken);
Router.post('/logout', AuthController.logout);

// 

Router.get('/me', Auth.checkAuth, UserController.getUserByToken);

Router.put('/update', Auth.checkAuth, UserValidator.updateUserValidation, validate, UserController.updateUserByToken);

//
Router.post('/send-verify-sms-otp', Security.authLimiter, ContactValidator.sendVerifySmsValidation, validate, VerifyController.sendVerifySmsOtp);

Router.put('/verify-sms', Security.authLimiter, ContactValidator.verifySmsValidation, validate, VerifyController.verifySmsOtp);

// 
Router.get('/', Auth.checkAuth, UserController.getAllUsers);

Router.get('/:id', Auth.checkAuth, UserController.getUserById);

Router.delete('/:id', Auth.checkAuth, UserController.deleteUserById);

module.exports = Router;
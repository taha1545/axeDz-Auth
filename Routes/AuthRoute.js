const express = require("express");
const Router = express.Router();

const { AuthController, UserController, VerifyController } = require('../Controllers');
const Upload = require('../app/Services/Storage');
const { Auth } = require('../app/Middlewares');
const { UserValidator, ContactValidator } = require('../app/Validators');
const { validate } = require('../app/Middlewares');
const Security = require('../app/Middlewares/Security');

//
Router.post('/signup', Security.authLimiter, Upload.single('image'), UserValidation.signupValidation, Validate, AuthController.signUp);

Router.post('/login', Security.authLimiter, Security.bruteForceDelay, UserValidation.loginValidation, Validate, AuthController.login);

Router.post('/send-reset-otp', Security.authLimiter, UserValidation.sendResetOtpValidation, Validate, AuthController.sendResetOtp);

Router.put('/reset-password-otp', Security.authLimiter, UserValidation.resetPasswordWithOtpValidation, Validate, AuthController.resetPasswordWithOtp);

Router.patch('/reset-password', Auth.checkAuth, UserValidation.updatePasswordValidation, Validate, AuthController.resetPassword);
Router.post('/refresh-token', UserValidation.refreshTokenValidation, Validate, AuthController.refreshAccessToken);
Router.post('/logout', AuthController.logout);

// 

Router.get('/me', Auth.checkAuth, UserController.getUserByToken);

Router.put('/update', Auth.checkAuth, UserValidation.updateUserValidation, Validate, UserController.updateUserByToken);

//
Router.post('/send-verify-sms-otp', Security.authLimiter, ContactValidation.sendVerifySmsValidation, Validate, VerifyController.sendVerifySmsOtp);

Router.put('/verify-sms', Security.authLimiter, ContactValidation.verifySmsValidation, Validate, VerifyController.verifySmsOtp);

// 
Router.get('/', Auth.checkAuth, UserController.getAllUsers);

Router.get('/:id', Auth.checkAuth, UserController.getUserById);

Router.delete('/:id', Auth.checkAuth, UserController.deleteUserById);

module.exports = Router;
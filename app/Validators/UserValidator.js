const { body } = require('express-validator');
const db = require('../../db/models');

const loginValidation = [
    body('identifier')
        .notEmpty().withMessage('Email or phone is required')
        .custom(async (identifier) => {
            const existingUser = await db.User.findOne({
                where: {
                    [db.Sequelize.Op.or]: [
                        { email: identifier },
                        { phone: identifier }
                    ]
                }
            });
            if (!existingUser) {
                throw new Error('User not found with this email or phone');
            }
        }),
    body('password').notEmpty().withMessage('Password is required'),
];

const signupValidation = [
    body('name').notEmpty().withMessage('Name is required'),
    //
    body('email')
        .isEmail().withMessage('Valid email is required')
        .custom(async (email) => {
            const existingUser = await db.User.findOne({ where: { email } });
            if (existingUser) {
                throw new Error('Email is already in use');
            }
        }),
    //
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters'),
    body('phone').optional().isString().withMessage('Phone must be a string'),
];


const sendResetOtpValidation = [
    body('email')
        .isEmail().withMessage('Valid email is required')
        .custom(async (email) => {
            const existingUser = await db.User.findOne({ where: { email } });
            if (!existingUser) {
                throw new Error('Email does not exist');
            }
        }),
];

const resetPasswordWithOtpValidation = [
    body('email')
        .isEmail().withMessage('Valid email is required'),
    body('otp_code').notEmpty().withMessage('OTP code is required'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters'),
];

const updatePasswordValidation = [
    body('oldPassword').notEmpty().withMessage('Old password is required'),
    body('newPassword')
        .isLength({ min: 6 })
        .withMessage('New password must be at least 6 characters'),
];

const updateUserValidation = [
    body('name')
        .optional()
        .notEmpty()
        .withMessage('Name cannot be empty'),
    //
    body('email')
        .optional()
        .isEmail()
        .withMessage('Must be a valid email address')
        .custom(async (email, { req }) => {
            //
            const userId = req.user?.id;
            //
            const existingUser = await db.User.findOne({ where: { email } });
            //
            if (existingUser && existingUser.id !== userId) {
                throw new Error('Email is already in use');
            }
        }),
];

const refreshTokenValidation = [
    body('refreshToken')
        .optional()
        .isString()
        .withMessage('refreshToken must be a string'),
];

module.exports = {
    loginValidation,
    signupValidation,
    sendResetOtpValidation,
    resetPasswordWithOtpValidation,
    updatePasswordValidation,
    updateUserValidation,
    refreshTokenValidation,
};

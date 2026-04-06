const { body } = require("express-validator");

const createContactValidation = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("phone").optional({ nullable: true }).isString().withMessage("Phone must be a string"),
  body("subject").notEmpty().withMessage("Subject is required"),
  body("message").notEmpty().withMessage("Message is required"),
  body("status")
    .optional()
    .isIn(["unread", "read"])
    .withMessage("Status must be unread or read"),
];

const updateContactValidation = [
  body("name").optional().notEmpty().withMessage("Name cannot be empty"),
  body("email").optional().isEmail().withMessage("Valid email is required"),
  body("phone").optional({ nullable: true }).isString().withMessage("Phone must be a string"),
  body("subject").optional().notEmpty().withMessage("Subject cannot be empty"),
  body("message").optional().notEmpty().withMessage("Message cannot be empty"),
  body("status")
    .optional()
    .isIn(["unread", "read"])
    .withMessage("Status must be unread or read"),
];

const sendVerifySmsValidation = [
  body("phone").notEmpty().withMessage("Phone is required").isString().withMessage("Phone must be a string"),
];

const verifySmsValidation = [
  body("phone").notEmpty().withMessage("Phone is required").isString().withMessage("Phone must be a string"),
  body("otp_code").notEmpty().withMessage("OTP code is required"),
];

module.exports = {
  createContactValidation,
  updateContactValidation,
  sendVerifySmsValidation,
  verifySmsValidation,
};

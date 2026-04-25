const { body } = require('express-validator');
const db = require('../../db/models');

const createApiKeyValidation = [
  body('project_name')
    .notEmpty()
    .withMessage('Project name is required')
    .isString()
    .withMessage('Project name must be a string'),
  body('key')
    .optional()
    .isUUID()
    .withMessage('Key must be a valid UUID')
    .custom(async (key) => {
      if (key) {
        const existingKey = await db.ApiKey.findOne({ where: { key } });
        if (existingKey) {
          throw new Error('API key already exists');
        }
      }
    }),
  body('secret_hash')
    .notEmpty()
    .withMessage('Secret hash is required')
    .isString()
    .withMessage('Secret hash must be a string'),
  body('status')
    .optional()
    .isIn(['active', 'suspended', 'blocked'])
    .withMessage('Status must be active, suspended, or blocked'),
];

const updateApiKeyValidation = [
  body('project_name')
    .optional()
    .isString()
    .withMessage('Project name must be a string'),
  body('key')
    .optional()
    .isUUID()
    .withMessage('Key must be a valid UUID')
    .custom(async (key, { req }) => {
      if (key) {
        const existingKey = await db.ApiKey.findOne({
          where: { key, id: { [db.Sequelize.Op.ne]: req.params.id } },
        });
        if (existingKey) {
          throw new Error('API key already exists');
        }
      }
    }),
  body('secret_hash')
    .optional()
    .isString()
    .withMessage('Secret hash must be a string'),
  body('status')
    .optional()
    .isIn(['active', 'suspended', 'blocked'])
    .withMessage('Status must be active, suspended, or blocked'),
];

const validateApiKeyValidation = [
  body('key')
    .notEmpty()
    .withMessage('Key is required')
    .isUUID()
    .withMessage('Key must be a valid UUID'),
];

module.exports = {
  createApiKeyValidation,
  updateApiKeyValidation,
  validateApiKeyValidation,
};
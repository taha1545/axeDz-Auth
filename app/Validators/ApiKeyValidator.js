const { body } = require('express-validator');
const db = require('../../db/models');

const createApiKeyValidation = [
    body('project_name')
        .notEmpty()
        .withMessage('Project name is required')
        .isString()
        .withMessage('Project name must be a string')
];

const updateApiKeyValidation = [
    body('project_name')
        .optional()
        .isString()
        .withMessage('Project name must be a string'),
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
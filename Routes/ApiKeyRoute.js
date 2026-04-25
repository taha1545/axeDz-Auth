const express = require('express');
const router = express.Router();

const { ApiKeyController } = require('../Controllers');
const { Auth } = require('../app/Middlewares');
const { ApiKeyValidator } = require('../app/Validators');
const { validate } = require('../app/Middlewares');

router.post('/', Auth.checkAuth, ApiKeyValidator.createApiKeyValidation, validate, ApiKeyController.createApiKey);
router.post('/validate', Auth.checkAuth, ApiKeyValidator.validateApiKeyValidation, validate, ApiKeyController.validateApiKey);
router.get('/', Auth.checkAuth, ApiKeyController.listApiKeys);
router.get('/:id', Auth.checkAuth, ApiKeyController.getApiKeyById);
router.put('/:id', Auth.checkAuth, ApiKeyValidator.updateApiKeyValidation, validate, ApiKeyController.updateApiKey);
router.delete('/:id', Auth.checkAuth, ApiKeyController.deleteApiKey);

module.exports = router;

const express = require("express");
const Router = express.Router();

const { StorageController } = require('../Controllers');
const { Auth } = require('../app/Middlewares');

// Get signed URL for file (public)
Router.get('/file/:fileKey', StorageController.getSignedUrl);

// Delete file (authenticated)
Router.delete('/file/:fileKey', Auth.checkAuth, StorageController.deleteStorageFile);

module.exports = Router;

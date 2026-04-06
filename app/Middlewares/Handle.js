const { ValidationError: ExpressValidationError } = require('express-validator');
const fs = require('fs');
const logger = require('../Services/Logger');

function errorHandler(err, req, res, next) {
    //
    const statusCode = err.statusCode || 500;
    const errMessage = err.message || "Internal Server Error";
    // Log the error
    logger.error(`${err.name}: ${errMessage} - ${req.method} ${req.originalUrl} - ${err.stack || ''}`);
    //
    if (err.code === 'INVALID_FILE_TYPE') {
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }

    if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
            success: false,
            message: "File is too large"
        });
    }

    if (err.errors && Array.isArray(err.errors)) {
        return res.status(400).json({
            success: false,
            message: err.message || "Validation error",
            errors: err.errors
        });
    }

    res.status(statusCode).json({
        success: false,
        message: errMessage,
    });
}

module.exports = errorHandler;



require('dotenv').config();

const jwt = require('jsonwebtoken');
const ACCESS_SECRET = process.env.JWT_SECRET;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET;
const ACCESS_LIFETIME = process.env.JWT_LIFETIME || '15m';
const REFRESH_LIFETIME = process.env.JWT_REFRESH_LIFETIME || '30d';

const AuthError = require('../Error/AuthError');

const CreateAccessToken = (payload) => {
    try {
        return jwt.sign(payload, ACCESS_SECRET, { expiresIn: ACCESS_LIFETIME });
    } catch (err) {
        throw new Error("AUTH SIGN TOKEN ERROR: " + err.message);
    }
};

const CreateRefreshToken = (payload) => {
    try {
        return jwt.sign(payload, REFRESH_SECRET, { expiresIn: REFRESH_LIFETIME });
    } catch (err) {
        throw new Error("AUTH SIGN REFRESH TOKEN ERROR: " + err.message);
    }
};

const ValidateAccessToken = (token) => {
    try {
        return jwt.verify(token, ACCESS_SECRET);
    } catch (err) {
        throw new AuthError("INVALID TOKEN: " + err.message);
    }
};

const ValidateRefreshToken = (token) => {
    try {
        return jwt.verify(token, REFRESH_SECRET);
    } catch (err) {
        throw new AuthError("INVALID REFRESH TOKEN: " + err.message);
    }
};

const CreateToken = CreateAccessToken;
const ValidateToken = ValidateAccessToken;


module.exports = {
    CreateAccessToken,
    CreateRefreshToken,
    ValidateAccessToken,
    ValidateRefreshToken,
    CreateToken,
    ValidateToken
};




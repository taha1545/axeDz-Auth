const { ApiKeyResource } = require('../app/Resource');
const { NotFoundError } = require('../app/Error');
const db = require('../db/models');
const ApiKeyQuery = require('../app/querys/ApiKeyQuery');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const createApiKey = async (req, res) => {
    //
    const key = crypto.randomUUID();
    const secret = crypto.randomBytes(32).toString('hex');
    const secret_hash = await bcrypt.hash(secret, 10);
    const status = 'active';
    //
    const apiKey = await db.ApiKey.create({
        user_id: req.user.id,
        project_name: req.body.project_name,
        secret_hash,
        status,
        key,
    });
    //
    res.status(201).json({
        success: true,
        apiKey: ApiKeyResource(apiKey),
        secret,
    });
};

const listApiKeys = async (req, res) => {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;
    const { where, limit: queryLimit, offset } = ApiKeyQuery.buildListQuery({
        ...req.query,
        page,
        limit,
    });
    //
    const { count, rows } = await db.ApiKey.findAndCountAll({
        where: {
            ...where,
            user_id: req.user.id,
        },
        limit: queryLimit,
        offset,
        order: [['created_at', 'DESC']],
    });
    //
    res.status(200).json({
        success: true,
        apiKeys: rows.map(ApiKeyResource),
        pagination: {
            total: count,
            page,
            pages: Math.ceil(count / limit),
        },
    });
};

const getApiKeyById = async (req, res) => {
    const apiKey = await db.ApiKey.findOne({
        where: {
            id: req.params.id,
            user_id: req.user.id,
        },
    });
    //
    if (!apiKey) throw new NotFoundError('API key not found');
    //
    res.status(200).json({
        success: true,
        apiKey: ApiKeyResource(apiKey),
    });
};

const updateApiKey = async (req, res) => {
    const apiKey = await db.ApiKey.findOne({
        where: {
            id: req.params.id,
            user_id: req.user.id,
        },
    });
    //
    if (!apiKey) throw new NotFoundError('API key not found');
    //
    ['project_name', 'status'].forEach((field) => {
        if (req.body[field] !== undefined) {
            apiKey[field] = req.body[field];
        }
    });
    await apiKey.save();
    //
    res.status(200).json({
        success: true,
        message: 'API key updated',
        apiKey: ApiKeyResource(apiKey),
    });
};

const deleteApiKey = async (req, res) => {
    const apiKey = await db.ApiKey.findOne({
        where: {
            id: req.params.id,
            user_id: req.user.id,
        },
    });
    if (!apiKey) throw new NotFoundError('API key not found');
    await apiKey.destroy();
    res.status(200).json({
        success: true,
        message: 'API key deleted successfully',
    });
};

const validateApiKey = async (req, res) => {
    const apiKey = await db.ApiKey.findOne({
        where: {
            key: req.body.key,
            status: 'active',
            user_id: req.user.id,
        },
    });
    if (!apiKey) throw new NotFoundError('API key not found or inactive');
    //
    res.status(200).json({
        success: true,
        message: 'API key is valid',
        apiKey: ApiKeyResource(apiKey),
    });
};

module.exports = {
    createApiKey,
    listApiKeys,
    getApiKeyById,
    updateApiKey,
    deleteApiKey,
    validateApiKey,
};
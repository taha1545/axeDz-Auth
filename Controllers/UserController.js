const { UserResource } = require('../app/Resource');
const { NotFoundError } = require('../app/Error');
const db = require('../db/models');
const S3HandleJsonImage = require('../app/s3/HandleJson');


const getUserByToken = async (req, res) => {
    const user = await db.User.findByPk(req.user.id);
    //
    if (!user) throw new NotFoundError('User not found');
    //
    res.status(200).json({
        success: true,
        user: UserResource(user)
    });
};

const getUserById = async (req, res) => {
    const user = await db.User.findByPk(req.params.id);
    //
    if (!user) throw new NotFoundError('User not found');
    //
    res.status(200).json({
        success: true,
        user: UserResource(user)
    });
};

const getAllUsers = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 15;
    const offset = (page - 1) * limit;
    const { search } = req.query;
    //
    let where = {};
    if (search) {
        where = {
            [db.Sequelize.Op.or]: [
                { name: { [db.Sequelize.Op.iLike]: `%${search}%` } },
                { email: { [db.Sequelize.Op.iLike]: `%${search}%` } },
                { phone: { [db.Sequelize.Op.iLike]: `%${search}%` } }
            ]
        };
    }
    //
    const { count, rows } = await db.User.findAndCountAll({
        where,
        limit,
        offset,
    });
    //
    res.status(200).json({
        success: true,
        users: rows.map(data => UserResource(data)),
        pagination: {
            total: count,
            page,
            pages: Math.ceil(count / limit)
        }
    });
};


const updateUserByToken = async (req, res) => {
    const user = await db.User.findByPk(req.user.id);
    if (!user) throw new NotFoundError('User not found');
    // 
    if (req.body.image) {
        await S3HandleJsonImage(user, req.body.image);
    }
    //
    const allowedUpdates = ['name', 'email', 'phone'];
    allowedUpdates.forEach((field) => {
        if (req.body[field] !== undefined) user[field] = req.body[field];
    });
    //
    await user.save();
    //
    res.status(200).json({
        success: true,
        message: 'User updated',
        user: UserResource(user)
    });
};

const deleteUserById = async (req, res) => {
    //
    const { id } = req.params;
    const user = await db.User.findByPk(id);
    if (!user) throw new NotFoundError('User not found');
    //
    await user.destroy();
    return res.status(200).json({
        success: true,
        message: 'User deleted successfully'
    });
};


module.exports = {
    getUserById,
    getUserByToken,
    getAllUsers,
    updateUserByToken,
    deleteUserById
};
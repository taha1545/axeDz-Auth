const db = require('../db/models');
const { ContactResource } = require('../app/Resource');
const { NotFoundError } = require('../app/Error');

const All = async (req, res) => {
    //
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    const status = req.query.status || 'unread';
    //
    let where = { status };
    //
    const { count, rows } = await db.Contact.findAndCountAll({
        where,
        offset,
        limit,
        order: [['created_at', 'DESC']]
    });
    //
    return res.status(200).json({
        success: true,
        message: "Contacts retrieved successfully",
        data: rows.map(contact => ContactResource(contact)),
        pagination: {
            total: count,
            page,
            limit,
            totalPages: Math.ceil(count / limit)
        }
    });
};

const Show = async (req, res) => {
    const id = req.params.id;
    const contact = await db.Contact.findByPk(id);
    if (!contact) {
        throw new NotFoundError('Contact not found');
    }
    //
    return res.status(200).json({
        success: true,
        message: "Contact retrieved successfully",
        data: ContactResource(contact)
    });
};

const Create = async (req, res) => {
    const { name, email, phone = null, subject, message, status = "unread" } = req.body;
    const contact = await db.Contact.create({
        name,
        email,
        phone,
        subject,
        message,
        status
    });
    //
    return res.status(201).json({
        success: true,
        message: "Contact created successfully",
        data: ContactResource(contact)
    });
};

const Update = async (req, res) => {
    const id = req.params.id;
    const contact = await db.Contact.findByPk(id);
    if (!contact) {
        throw new NotFoundError('Contact not found');
    }
    //
    contact.status = req.body.status;
    await contact.save();
    //
    return res.status(200).json({
        success: true,
        message: "Contact updated successfully",
        data: ContactResource(contact)
    });
};

const Delete = async (req, res) => {
    const id = req.params.id;
    const contact = await db.Contact.findByPk(id);
    //
    if (!contact) {
        throw new NotFoundError('Contact not found');
    }
    //
    await contact.destroy();
    //
    return res.status(200).json({
        success: true,
        message: "Contact deleted successfully"
    });
};

module.exports = {
    All,
    Show,
    Create,
    Update,
    Delete
};

const db = require('../../../db/models');
const { Op } = db.Sequelize;

const buildListQuery = ({ search, status, project_name, key, page = 1, limit = 30 } = {}) => {
  const where = {};

  if (search) {
    where[Op.or] = [
      { project_name: { [Op.iLike]: `%${search}%` } },
      { key: { [Op.iLike]: `%${search}%` } },
    ];
  }

  if (status) {
    where.status = status;
  }

  if (project_name) {
    where.project_name = { [Op.iLike]: `%${project_name}%` };
  }

  if (key) {
    where.key = key;
  }

  return {
    where,
    limit: parseInt(limit, 10) || 15,
    offset: (Math.max(parseInt(page, 10), 1) - 1) * (parseInt(limit, 10) || 15),
  };
};

module.exports = {
  buildListQuery,
};
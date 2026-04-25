"use strict";

const Sequelize = require("sequelize");
const config = require(__dirname + "/../../config/config.js").development;

const sequelize = new Sequelize(config);
const db = {};

db.User = require("./user.js")(sequelize, Sequelize.DataTypes);
db.Contact = require("./contact.js")(sequelize, Sequelize.DataTypes);
db.UserOtp = require("./userOtp.js")(sequelize, Sequelize.DataTypes);
db.ApiKey = require("./apiKey.js")(sequelize, Sequelize.DataTypes);

db.User.hasMany(db.UserOtp, { foreignKey: "user_id", as: "otps" });
db.UserOtp.belongsTo(db.User, { foreignKey: "user_id", as: "user" });

db.User.hasMany(db.ApiKey, { foreignKey: "user_id", as: "apiKeys" });
db.ApiKey.belongsTo(db.User, { foreignKey: "user_id", as: "user" });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

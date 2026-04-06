"use strict";

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Contact",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      subject: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("unread", "read"),
        allowNull: false,
        defaultValue: "unread",
      },
    },
    {
      tableName: "contacts",
      createdAt: "created_at",
      updatedAt: false,
    }
  );
};

"use strict";

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "User",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      google_id: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true,
      },
      imagePath: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      is_verified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      tableName: "users",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
};

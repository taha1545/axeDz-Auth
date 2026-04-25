"use strict";

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "ApiKey",
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      project_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      key: {
        type: DataTypes.UUID,
        unique: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      secret_hash: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('active', 'suspended', 'blocked'),
        allowNull: false,
        defaultValue: 'active',
      },
    },
    {
      tableName: "api_keys",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
};
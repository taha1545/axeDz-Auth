"use strict";

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "UserOtp",
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      otp_code: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM("email", "verifySms", "resetPassword"),
        allowNull: false,
      },
      expires_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      used_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: "user_otps",
      createdAt: "created_at",
      updatedAt: false,
    }
  );
};

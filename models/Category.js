const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Category extends Model {}

Category.init(
  {
    // id: auto-incrementing integer set as the PRIMARYKEY (cannot be NULL)
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    // category_name: string(VARCHAR) cannot be NULL
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
      // stops names from being repeated
      unique: true,
      // validate len[4] sets/verifies the minimum string length
      validate: {
        len: [4]
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

module.exports = Category;

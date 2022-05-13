// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');
const Category = require('./Category');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    // id: auto-incrementing integer set as the PRIMARY KEY (cannot be NULL)
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    // product_name: string(VARCHAR) cannot be NULL
    product_name: {
        type: DataTypes.STRING,
        allowNull: false,
        // validate len[4] sets/verifies minimum string length
        validate: {
          len: [4]
        }
    },
    // price: decimal, cannot be NULL
    price: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
      // validate value is a decimal
      validate: {
        isDecimal: true
      }
    },
    // stock: integer, cannot be NULL, default value of 10
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
      // validate value is numeric (integer)
      validate: {
        isNumeric: true
      }
    },
    // category_id: integer (FOREIGN KEY)
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      // foreignKey that references id from Category model, if deleted sets to NULL
      references: {
        model: 'category',
        key: 'id',
        onDelete: 'SET NULL'
      }
    }

  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;

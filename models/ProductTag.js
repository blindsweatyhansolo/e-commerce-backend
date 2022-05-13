const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model {}

ProductTag.init(
  {
    // id: auto-incrementing integer set as the PRIMARY KEY (cannot be NULL)
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    // product_id: integer (FOREIGN KEY)
    product_id: {
      type: DataTypes.INTEGER,
      // foreignKey that references id from Product model
      references: {
        model: 'product',
        key: 'id'
      }
    },
    // tag_id: integer (FOREIGN KEY)
    tag_id: {
      type: DataTypes.INTEGER,
      // foreignKey that references id from Tag model
      references: {
        model: 'tag',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;

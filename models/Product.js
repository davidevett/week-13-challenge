// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      // need to validate the price is a decimal number
      validate: {
        isDecimal: {
          args: true,
          msg: 'Price must be a decimal number.',
        },
      },
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // set default value to 10
      defaultValue: 10,
      // need to validate stock is a positive integer
      validate: {
        isInt: {
          args: true,
          min: 1,
          msg: 'Stock must be a positive integer.',
        },
      },
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: true,

      references: {
        model: 'category',
        key: 'id',
      },
    },
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

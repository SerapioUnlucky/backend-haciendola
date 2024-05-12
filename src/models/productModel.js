const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
    Handle: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    Title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    SKU: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Grams: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    Stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Compare_Price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Barcode: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false
});

module.exports = Product;

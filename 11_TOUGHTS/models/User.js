const { DataTypes } = require('sequelize');

const db = require('../db/conn');

const User = db.define('User', {
    name: {
        type: DataTypes.STRING,
        trquire: true,
    },
    email: {
        type: DataTypes.STRING,
        trquire: true,
    },
    password: {
        type: DataTypes.STRING,
        trquire: true,
    },
})

module.exports = User;
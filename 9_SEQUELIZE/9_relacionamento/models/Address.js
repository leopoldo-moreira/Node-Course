const { DataTypes } = require('sequelize');
const db = require('../db/conn');
const User = require('./User');

const Address = db.define('Adress', {
  street: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  number: {
    type: DataTypes.STRING,    
  },
  city: {
    type: DataTypes.STRING,    
  },
});

Address.belongsTo(User);

module.exports = Address;

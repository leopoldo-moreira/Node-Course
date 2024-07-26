//Configura a tabela Users que poderá ser lançada no banco de dados configurado no ../db/conn.js
const { DataTypes } = require('sequelize');

const db = require('../db/conn');

//começa a configurar os campos da tabela
const User = db.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  occupation: {
    type: DataTypes.STRING,
  },
  newsletter: {
    type: DataTypes.BOOLEAN,
  },
});

module.exports = User;
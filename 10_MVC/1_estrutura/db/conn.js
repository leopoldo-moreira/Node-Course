const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('nodemvc', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

try {
  sequelize.authenticate();
  console.log('Conectamos ao MySQL!');
} catch (error) {
  console.error('Não foi possivel conectar:', error);
}

module.exports = sequelize;
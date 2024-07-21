const { Sequelize } = require('sequelize');

// Argumentos: nome_do_banco, usuario, senha, {host: 'hostname', dialect: 'tipo_do_banco'};
const sequelize = new Sequelize('nodesequelize', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

try {
  sequelize.authenticate();
  console.log('Conectado ao Sequelize!');
} catch (err) {
  console.error('Não foi possivel conectar: ', err);
}

module.exports = sequelize;

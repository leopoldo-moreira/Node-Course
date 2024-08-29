const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('toughts', 'root', 'Qnj4$gyj.', {
    host: 'localhost',
    dialect: 'mysql'
});

try {
    sequelize.authenticate();
    console.log('Conected at the database!');
} catch (err) {
    console.log(`Not conected at the database: ${err}`);
}

module.exports = sequelize
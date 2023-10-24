const Sequelize = require('sequelize');
const { Guest } = require('./Guest');

const sequelize = new Sequelize('SWEProject', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

const Questions = sequelize.define('Questions', {
  email: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
  message: {
    type: Sequelize.STRING(255),
    allowNull: false,
  },
});

Questions.belongsTo(Guest, {
  foreignKey: 'email',
});

async function createTable() {
  await Questions.sync();
}

module.exports = {createTable, Questions}
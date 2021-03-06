const Sequelize = require('sequelize');

const sequelize = require('../helper/database');

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING
  },
  Email: {
    type: Sequelize.STRING
  }
})

module.exports = User;
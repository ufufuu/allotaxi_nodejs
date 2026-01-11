const { DataTypes } = require('sequelize');
const { sequelize } = require('./connection');

const Rider = sequelize.define('Rider', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dateOfBirth: {
    type: DataTypes.DATE,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, { tableName: 'riders' });

module.exports = {
	Rider
};
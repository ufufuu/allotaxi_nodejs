
const { DataTypes } = require('sequelize');
const { sequelize } = require('../dbConnection');
//const { Rider } = require('./riderModel');
//const { sequelize } = require('../config/dbConnection');
//const { sequelize } = require("sequelize"); //../config/dbConnection');

const BookingModel = sequelize.define('BookingModel', {
  reference: {
    type: DataTypes.STRING,
    allowNull: false
  },
  origin: {
    type: DataTypes.STRING,
    allowNull: false
  },
  destination: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, { tableName: 'bookings' });

/*
Rider.hasMany(BookingModel, { as: 'boookings', foreignKey: 'riderId' });
RideRequest.belongsTo(Rider, {
  foreignKey: "riderId",
});*/

module.exports = {
  //Author,
  
  BookingModel
};
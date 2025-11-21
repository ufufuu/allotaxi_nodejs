const { DataTypes } = require('sequelize');
const { sequelize } = require('./connection');
const { Rider } = require('./riderModel');

const RideRequest = sequelize.define('RideRequest', {

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
}, { tableName: 'requests' });

Rider.hasMany(RideRequest, { as: 'requests', foreignKey: 'riderId' });
RideRequest.belongsTo(Rider, {
  foreignKey: "riderId",
});

module.exports = {
  //Author,
  
  RideRequest
};
const { DataTypes } = require('sequelize');
const { sequelize } = require('../dbConnection');

const City = sequelize.define('City', {
  cityId:{
    type: DataTypes.INTEGER,
    allowNull: false,
	primaryKey:true
  },
  cityName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cityCountrycountryId: {
    type: DataTypes.INTEGER,
    allowNull: true
  }  
}, { tableName:'Cities' });


const Country = sequelize.define('Country', {
  Id: {
    type: DataTypes.INTEGER,
    allowNull: false,
	primaryKey: true,
	autoIncrement: true,
	field: 'countryId'
  },
  Name: {
    type: DataTypes.STRING,
    allowNull: false,
	field: 'countryName'
  },
  Region: {
    type: DataTypes.INTEGER,
    allowNull: true,
	field: 'regionId'
  }  
}, { 
	tableName:'Countries',
	timestamps:true,
	createdAt:false,
	updatedAt:false
});

Country.hasMany(City, { as: 'cities', foreignKey: 'regionId' });
	City.belongsTo(Country, {
  foreignKey: "regionId",
});

module.exports = {
  City,
  Country
};


/*
https://www.otcmarkets.com/learn/market-101/trading
    Proven experience as a successful trader in agricultural markets with a track record of profitable strategies
    Strong understanding of commodity markets, trading platforms, and financial instruments (futures, options, swaps).
    Market and new business development.
	
	Job Responsibilities

    Execute trades in physical and/or financial commodity markets in alignment with company strategy and risk appetite.
    Monitor global market trends, economic indicators, geopolitical developments, and supply-demand dynamics to identify trading opportunities.
    Develop and maintain relationships with brokers, suppliers, clients, and other market participants.
    Analyze market data and use quantitative models to forecast price movements and optimize trading strategies.
    Collaborate with logistics, finance, and compliance teams to ensure smooth trade execution and settlement.
    Maintain accurate records of trades and ensure compliance with regulatory requirements and internal policies.
    Prepare regular reports and presentations on trading performance and market outlook.
    Assess ways of growing our market access through significant lo
*/
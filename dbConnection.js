const { Sequelize } = require('sequelize');

const database = "allopromo_dbPostGres";
const username = "allopromo_user";
const password = "Kad@1207";
const host = "localhost";
const port = 5432;

const sequelize = new Sequelize(database, username, password, {
  host: host,
  dialect: 'postgres',
});

module.exports = {
  sequelize
}

//https://www.w3schools.com/nodejs/nodejs_api_auth.asp
const { Pool } = require("pg");
const { Sequelize } = require('sequelize');

const database = "postgres";
const username = "postgres";
const password = "Kad@1207";
const host = "localhost";
const port = 5432;

const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'postGres',
	password: 'Kad@1207',
	port: 5432,
});

const sequelize = new Sequelize(database, username, password, {
  host: host,
  dialect: 'postgres',
});

const connectionString = {
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'Kad@1207',
  port: 5432,
};

const prodConnectionString ={
};

module.exports = {
  sequelize,
  pool,
  connectionString
}

//https://www.w3schools.com/nodejs/nodejs_api_auth.asp
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
	database: 'postgres',
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

/*
const pool = new Pool({
	user: 'allopromo_db_px8b_user',
    host: 'dpg-d4909rm3jp1c73cqqo00-a.oregon-postgres.render.com',
    database: 'allopromo_db_px8b',
    password: 'Gel30X8RPqqksAO1LDHlJRali2hFA1ep',
    //dialect: 'postgres',
	//Persist Security Info: 'true',
	//SSL Mode: 'require',
    port: 5432,
});
*/
const prodConnectionString ={
};

module.exports = {
  sequelize,
  pool,
  connectionString
}

//https://www.w3schools.com/nodejs/nodejs_api_auth.asp
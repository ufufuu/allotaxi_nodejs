const { Pool } = require("pg");
const { Sequelize } = require('sequelize');
const fs = require('fs');
const env = require('dotenv').config();
const database = "postgres";
const username = "postgres";
const password = "Kad@1207";
const host = "localhost";
const port = 5432;
const { parseIntoClientConfig } = require('pg-connection-string');
//const config = parseIntoClientConfig(process.env.DATABASE_URL);


const sequelize = new Sequelize(process.env.REMOTE_DB_DATABASE, process.env.REMOTE_DB_USER, process.env.REMOTE_DB_PASSWORD, {
  host: process.env.REMOTE_DB_HOST,
  dialect: 'postgres',
});

const sequelize_00 = new Sequelize(database, username, password, {
  host: host,
  dialect: 'postgres',
});
 
const localDbConn = {
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'Kad@1207',
  port: 5432,
};

const dbProd =`postgresql://${process.env.REMOTE_DB_USER}:${process.env.REMOTE_DB_PASSWORD}@${process.env.REMOTE_DB_HOST}:${process.env.DB_PORT}/${process.env.REMOTE_DB_DATABASE}`;

/*
const dbConnString =`postgresql://allopromo_db_px8b_user`+
  `:SU0Z9B7OFMsxuhnZ4t5nMqWxdVot9kJq`+
  `@dpg-d4909rm3jp1c73cqqo00-a.oregon-postgres.render.com`+
  `/allopromo_db_px8b`;
*/

const remoteDBConn= {
  "host": 'dpg-d55c8l15pdvs73c2eo8g-a.oregon-postgres.render.com',
  "database": 'allotaxi_db',
  "user": 'allotaxi_db_user',
  "password": 'SU0Z9B7OFMsxuhnZ4t5nMqWxdVot9kJq',
  //"port": 5432,
  "dialect":'postgres',
  "ssl":'true',
};

const pool932 = new Pool({
  connectionString: process.env.NODE_ENV === 'production' 
  ? dbProd : remoteDBConn,
});
const pool = new Pool(process.env.NODE_ENV === 'production'? dbProd : remoteDBConn);

//const config = parseIntoClientConfig(process.env.DATABASE_URL);

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

module.exports = {
  sequelize,
  pool,
  //dbProd,
  remoteDBConn,
  localDbConn
}

/*
const config = {
  connectionString: 'postgres://user:password@host:port/db?sslmode=require',
  // Beware! The ssl object is overwritten when parsing the connectionString
  ssl: {
    rejectUnauthorized: false,
    ca: fs.readFileSync('/path/to/server-certificates/root.crt').toString(),
  },
}
*/
// https://stackoverflow.com/questions/22301722/ssl-for-postgresql-connection-nodejs
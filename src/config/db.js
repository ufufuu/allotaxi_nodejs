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

const remoteDBConn= {
  "host": process.env.REMOTE_DB_HOST,
  "database": process.env.REMOTE_DB_DATABASE,
  "user": process.env.REMOTE_DB_USER,
  "password": process.env.REMOTE_DB_PASSWORD,
  
  //"port": 5432,
  "dialect":'postgres',
  "ssl":'true',
};

const pool932 = new Pool({
  connectionString: process.env.NODE_ENV === 'production' 
  ? dbProd : remoteDBConn,
});

const pool = new Pool(process.env.NODE_ENV === 'production'? dbProd : remoteDBConn);


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
const { Pool } = require("pg");
const { Sequelize } = require('sequelize');
const fs = require('fs');
const env = require('dotenv').config();
const database = "postgres";
const username = "postgres";
const password = "Kad@1207";
const host = "localhost";
const port = 5432;

/*const lPool = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'postgres',
	password: 'Kad@1207',
	port: 5432,
});*/

const sequelize = new Sequelize(process.env.REMOTE_DB_DATABASE, process.env.REMOTE_DB_USER, process.env.REMOTE_DB_PASSWORD, {
  host: process.env.REMOTE_DB_HOST,
  dialect: 'postgres',
});

const sequelize_00 = new Sequelize(database, username, password, {
  host: host,
  dialect: 'postgres',
});

const dbConnString23 = {
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'Kad@1207',
  port: 5432,
};

const localDbConn = {
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'Kad@1207',
  port: 5432,
};
//const dbProductionUrl= `"Server=dpg-d4909rm3jp1c73cqqo00-a.oregon-postgres.render.com;Database=allopromo_db_px8b;User ID=allopromo_db_px8b_user;Password=Gel30X8RPqqksAO1LDHlJRali2hFA1ep;Persist Security Info=True;SSL Mode=Require"`;

const dbProd =`postgresql://${process.env.REMOTE_DB_USER}:${process.env.REMOTE_DB_PASSWORD}@${process.env.REMOTE_DB_HOST}:${process.env.DB_PORT}/${process.env.REMOTE_DB_DATABASE}`;
const pool = new Pool({
  connectionString:'postgres://allopromo_db_px8b_user:Gel30X8RPqqksAO1LDHlJRali2hFA1ep@Hdpg-d4909rm3jp1c73cqqo00-a.oregon-postgres.render.com/allopromo_db_px8b?ssl=true'
   
});

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
  /*
  "dialectOptions": {

      sslmode: require,
    },*/
  //ssl:true,

  //ssl: {
    //rejectUnauthorized: false,
    //ca: fs.readFileSync('/path/to/server-certificates/root.crt').toString(),
    //key: fs.readFileSync('/path/to/client-key/postgresql.key').toString(),
    //cert: fs.readFileSync('/path/to/client-certificates/postgresql.crt').toString(),
    //ca: fs.readFileSync("server-ca.pem").toString(),
    //key: fs.readFileSync("client-key.pem").toString(),
    //cert: fs.readFileSync("client-cert.pem").toString(),
  //},
};


// "ProdPostGres": "Server=dpg-d4909rm3jp1c73cqqo00-a.oregon-postgres.render.com;
// Database=allopromo_db_px8b;
// User ID=allopromo_db_px8b_user;
// Password=Gel30X8RPqqksAO1LDHlJRali2hFA1ep;Persist Security Info=True;SSL Mode=Require"

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
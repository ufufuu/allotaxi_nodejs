const express = require('express');
const swaggerUI = require('swagger-ui-express');

//const {signupUser} = require('./controllers/authController');
//const swaggerDoc = YAML.load(path.join(__dirname, './swagger.yaml'));
//const YAML = require('yamljs');

const cors = require("cors");
const userController = require('./controllers/userController');
const swaggerDocument = require('./swagger.js');
const swaggerSpec = require('./swagger');

const path = require('path');
const pg = require('pg');
const app = express();

const Pool = require('pg').Pool;
const userRoutes = require('./routes/userRoutes');
const driverRoutes = require("./routes/driverRoutes");

const port = 3001; // process.env.PORT || 3000;

var options = {
  explorer: true
};

var connectionString = {
  user: 'allopromo_user',
  host: 'localhost',
  database: 'allopromo_dbPostGres',
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
const pool = new pg.Pool(connectionString);

pool.connect((err, client, release) => {
    if (err) {
        return console.error(
            'Error acquiring client', err.stack)
    }
    client.query('SELECT NOW()', (err, result) => {
        release()
        if (err) {
            return console.error(
                'Error executing query', err.stack)
        }
        console.log("Connected to Database !")
    })
});

app.use(cors());
app.use(express.json());
app.use("/user", userRoutes);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec)); //swaggerDocument, options));

app.listen( port, () =>{
	console.log(`app started and listening on ${port}`);
});
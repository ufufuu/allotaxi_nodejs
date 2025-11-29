const express = require('express');
const swaggerUI = require('swagger-ui-express');

const cors = require("cors");
const userController = require('./controllers/userController');
const swaggerDocument = require('./swagger.js');
const swaggerSpec = require('./swagger');

const path = require('path');
const pg = require('pg');
const app = express();

const Pool = require('pg').Pool;
//const cookieParser = require("cookie-parser");

const bookingRoutes = require("./routes/bookingRoutes");
const userRoutes = require('./routes/userRoutes');
const driverRoutes = require("./routes/driverRoutes");
const userAuth = require("./middlewares/auth");
const { connectionString } = require("./config/db");

const port = 3001; // process.env.PORT || 3000;

var options = {
  explorer: true
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
app.disable("x-powered-by"); 	//// Change To Allow oringin only !
//app.use(cookieParser());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/user", userRoutes);
app.use("/bookings", userAuth, bookingRoutes);
 
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec)); //swaggerDocument, options));

app.listen( port, () =>{
	console.log(`app started and listening on ${port}`);
});

// Handling Errors
app.on("unhandledRejection", err => {
  console.log(`An error occurred: ${err.message}`)
  server.close(() => process.exit(1))
})


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

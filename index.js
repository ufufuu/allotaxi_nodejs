
const express = require('express');
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./swagger.js');
//const YAML = require('yamljs');
const path = require('path');


//Load the Swagger file or YAML
//const swaggerDoc = YAML.load(path.join(__dirname, './swagger.yaml'));

const swaggerSpec = require('./swagger');

//const userRoutes = require('./routes/user.route');
  
const app = express();
const port = 3001; // process.env.PORT || 3000;

var options = {
  explorer: true
};

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec)); //swaggerDocument, options));

app.listen( port, () =>{
	console.log(`app started and listening on ${port}`);
});
const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/*
or if you are using Express router

const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));
*/

/*
OpenAPI Specification (OAS) / Swagger Definition:
This defines your API's structure, endpoints, parameters, request/response bodies, and other details. 
It can be written in YAML or JSON format.
*/

/*
 10 Mars 2023
*/
 
//// Express Routing
const express = require('express');
const router = require('./routes/index.js'); 

const app = express();

const bodyParser = express.json();
app.use(bodyParser);


app.use('/api',router);


module.exports = app;
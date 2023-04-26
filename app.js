
//// Express Routing
const express = require('express');
const router = require('./routes/index.js'); 

const app = express();

const bodyParser = express.json();
app.use(bodyParser);


app.use('/api',router);



//// SERVER
const http = require('http');

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(PORT,() => {
console.log(`App started on port ${PORT}`);    
});







// Setup empty JS object to act as endpoint for all routes
let projectData = {};

require("dotenv").config({path: './config.env'});
console.log(process.env.key);

// Require Express to run server and routes
const express = require('express');
const bodyParser = require ('body-parser') 

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
const { RSA_NO_PADDING } = require('constants');
app.use(cors());

// Start up an instance of app
app = express();

app.use(express.static('website'));

// Initialize the main project folder
//GET route

app.get('/all', function (req, res){
    res.send(projectData);
  });

//Post route

let data = [];

app.post('/create', function(req, res){
    data.push(req.body);
    projectData["newEntry"] = data;
});

// Setup Server
const port = 3000;

function listening() {
    console.log(`listening on port ${port}`);
}

app.listen(port, listening());
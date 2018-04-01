var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
const cors = require("cors");
const keys = require('./keys');
var app = express();

app.use(cors({
    methods: ["POST"]
}));

// RUN 
app.listen(8080, () => {
    console.log("listening at http://localhost:8080");
});

// Get

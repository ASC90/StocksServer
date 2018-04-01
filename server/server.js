var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
const cors = require("cors");
const claves = require('./keys');
const functions = require('./functions-for-server');
var app = express();

app.use(cors({
    methods: ["POST"]
}));

// RUN 
app.listen(8080, () => {
    console.log("listening at http://localhost:8080");
});

// Get
app.get("/getTickers", function (req, res) {
    var options = 'https://api.iextrading.com/1.0/ref-data/symbols';
    // let jsonObj = JSON.stringify(functions.functions.reqest(options));
    // res.send(jsonObj);
    /*let obj = functions.functions.reqest(options);
    setTimeout(() => {
        console.log('obj', obj);
    }, 10000);*/
    let obj = functions.functions.reqest(options).then(function(pres){
        console.log('assigned', pres);
        fs.writeFile('./tickers.json', pres, function (err) {
            if (err) throw err;
            console.log('Saved!');
        });
        res.send(pres);
    });
    
});



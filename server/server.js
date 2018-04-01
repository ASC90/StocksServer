var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
const cors = require("cors");
const claves = require('./keys');
const functions = require('./functions-for-server');
var jsonTickers;
var app = express();
// const path = require('path');

fs.stat('./JSON_files/tickers.json', function (err, stat) {
    if (err == null) {
        console.log('File exists');
        jsonTickers = require('./JSON_files/tickers.json');
    }
});

app.use(cors({
    methods: ["POST"]
}));

// RUN 
app.listen(8080, () => {
    console.log("listening at http://localhost:8080");
});

// Get tickers
app.get("/getTickers", function (req, res) {
    let options = 'https://api.iextrading.com/1.0/ref-data/symbols';
    // let jsonObj = JSON.stringify(functions.functions.reqest(options));
    // res.send(jsonObj);
    /*let obj = functions.functions.reqest(options);
    setTimeout(() => {
        console.log('obj', obj);
    }, 10000);*/
    let obj = functions.functions.reqest(options).then(function (pres) {
        let tickers = JSON.parse(pres);
        res.send(tickers);
        fs.writeFile('./JSON_files/tickers.json', pres, function (err) {
            if (err) throw err;
            //console.log('Saved!');
        });
    });
});
let arrHealthyCompanies = [];
let arrNullCompanies = [];
setTimeout(() => {
    let _tickers = jsonTickers;
    let i = 0
    let interval = setInterval(() => {
        if (_tickers == undefined) {
            console.log("no hay tickers, haz una request de http://localhost:8080/getTickers");
            clearInterval(interval);
        } else {
            console.log('tickers', _tickers[i].symbol);
            //
            let companyTicker = _tickers[i].symbol;
            let obj = functions.functions.reqest("https://www.quandl.com/api/v3/datasets/WIKI/" + _tickers[i].symbol + "/data.json?api_key=" + claves._keys.QUANDL_KEY).then(function (pres) {
                let company = JSON.parse(pres);
                if (company.dataset_data) {
                    arrHealthyCompanies.push(companyTicker);
                    fs.writeFile('./JSON_files/' + companyTicker + '.json', pres, function (err) {
                        if (err) throw err;
                        //console.log('Saved!');
                    });
                } else {
                    arrNullCompanies.push(companyTicker);
                }
            });
            //
            i++;
            if (i > _tickers.length - 1) {
                console.log('end');
                fs.writeFile('./JSON_files/notFound.json', arrNullCompanies, function (err) {
                    if (err) throw err;
                    //console.log('Saved!');
                });
                clearInterval(interval);
            }
        }
    }, 1500);
}, 1000);

app.get("/test", function (req, res) {
    res.send({ a: arrHealthyCompanies, b: arrNullCompanies });
});



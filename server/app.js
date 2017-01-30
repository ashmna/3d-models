const express = require('express');
const bodyParser = require('body-parser');
const exec = require('child_process').execFileSync;

const app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        // Pass to next layer of middleware
        next();
    }


    // next();
});


app.post('/generate-model', function (req, res, next) {
    console.log(req.body);
    exec('cp', ['/Users/amnacakanyan/github/3d-models/src/www/0103070090186.stl', '/Users/amnacakanyan/github/3d-models/src/www/3589273459.stl']);
    res.json({
        file: "3589273459.stl"
    });
});


app.listen(3003);

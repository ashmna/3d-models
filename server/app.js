const express = require('express');
const bodyParser = require('body-parser');
// const exec = require('child_process').execFileSync;
const fs = require('fs');

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

app.use(express.static('resources'));


app.post('/generate-model', function (req, res, next) {
    const date = new Date();
    const params = req.body.params;
    const fileName = date.getTime();
    const filePath = __dirname + '\\resources\\' + fileName;
    params['Out_File'] = filePath;
    console.log(params);
    fs.writeFileSync(`C:\\${fileName}.json`, JSON.stringify(params));
    
    const sendResponse = () => {
        if (fs.existsSync(filePath + '.stl')) {
            console.log(fileName);
            res.json({
                file: fileName + ".stl"
            });
        } else {
            setTimeout(() => sendResponse(), 500);
        }
    };
    sendResponse();   
});


app.listen(3003);

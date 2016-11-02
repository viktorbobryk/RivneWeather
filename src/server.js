'use strict';
 console.log("server works ");
var express = require('express');
var bodyParser = require("body-parser");
var MongoClient = require('mongodb').MongoClient;

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.get('/data', function (req, res) {
    MongoClient.connect('mongodb://localhost:27017/weather', function (error, db) {
        if (error) {
            console.log("sss - " + error);
        }
        var collection = db.collection('weather');
      
        console.log("qqq - " + collection.find().toArray(function (err, docs) {
            if (err) {
                console.log("aaa - " + err);
                docs = null;
            }
            res.send(docs);
        }));
        db.close();
    });
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});


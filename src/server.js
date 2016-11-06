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
            console.log("connection error " + error);
        }
         var collection = db.collection('weather3');
      
         collection.find().toArray(function (err, docs) {
            if (err) {
                console.log("collection error " + err);
                docs = null;
            }
            db.close();
            res.send(docs);
        });

    });
});

app.listen(3000, function () {
    console.log('RivneWeather is  listening on port 3000!');
});


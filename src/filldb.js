'use strict';
 console.log("filldb works ");
var request = require('request');
var Logger = require('./services/logger.js');
var MongoClient = require('mongodb').MongoClient;

var url = 'http://api.openweathermap.org/data/2.5/weather?q=Rivne,ua&APPID=3e78ad2536ed323a1c1e68f8512485b0';
var urlDB = 'mongodb://localhost:27017/weather';

var logger = new Logger('./logs/log.txt', false);

setInterval(function () {

    request(url, function (error, response, body) {

        if (error) {
            logger.logError(error);
        }

        if (!error && response.statusCode === 200) {
            MongoClient.connect(urlDB, function (error, db) {
                if (error) {
                    logger.logError(error);
                }


                var collection = db.collection('weather');
                
                collection.insertOne(JSON.parse(body).main, function (error, result) {
                    if (error) {
                        logger.logError(error);
                    }

                });
                
                db.close();
            });
        }
    });

}, 60000);

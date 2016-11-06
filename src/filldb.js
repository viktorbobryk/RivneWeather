'use strict';
 console.log("filldb works ");
var request = require('request');
var Logger = require('./services/logger.js');
var MongoClient = require('mongodb').MongoClient;

var url = 'http://api.wunderground.com/api/3a12f2714ca1b6e2/conditions/q/UA/Rivne.json';
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


                var collection = db.collection('weather2');
                
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

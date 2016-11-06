'use strict';
 console.log("filldb works ");
var request = require('request');
var Logger = require('./services/logger.js');
var MongoClient = require('mongodb').MongoClient;

var url = 'https://api.darksky.net/forecast/73ca2db6aa635b831a24746659e7c907/50.37,26.15';
var urlDB = 'mongodb://localhost:27017/weather2';

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
                    console.log(result);
                    console.log("----------------------------");
                });
                
                db.close();
            });
        }
    });

}, 60000);

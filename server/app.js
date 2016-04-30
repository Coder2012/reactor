/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var mongoose = require('mongoose');
var config = require('./config/environment');
var schedule = require('node-schedule');

// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);

// Populate DB with sample data
if(config.seedDB) { require('./config/seed'); }

// Setup server
var app = express();
var server = require('http').createServer(app);
var socketio = require('socket.io')(server, {
  serveClient: (config.env === 'production') ? false : true,
  path: '/socket.io-client'
});
require('./config/socketio')(socketio);
require('./config/express')(app);
require('./routes')(app);

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

//--------------------------------------------------

var m = require('./api/flight/flight.model');
var FlightModel = m.flights
var schema = m.schema;
var Scraper = require('./scraper');
var Pages = [];
var domain = 'http://www.xcleague.com';
var flightUrls = [];

schema.pre('save', function(next){
  var id = this.identifier;

    FlightModel.find({identifier : id}, function (err, docs) {
        if (!docs.length){
            next();
        }else{                
            // console.log('id exists: ', id);
            next(new Error());
        }
    });
  // next();
});

function generateUrls(limit) {
  var url = domain + '/xc/leagues/latest.html';
  var urls= [url];

  return urls;
}

// store all urls in a global variable  
Pages = generateUrls();

function scrapePilots() {
  if (!Pages.length) {
    Pages = generateUrls();
    return console.log('Scraping complete');
  }
  var url = Pages.pop();
  var scraper = new Scraper(url);
  var model;

  scraper.on('error', function (error) {
    console.log('bot error received from Scraper: ', error);
    scraper.resume();
  });

  scraper.on('complete', function (models) {
    
    for (var i = 0; i < models.length; i++) {
      model = new FlightModel(models[i]);

      model.save(function(err) {
        if (err) {
          // console.log('Database err saving: ' + model.identifier);
        }
      });

    }
    console.log("all models saved to MongoDB");

  });
}

//--------------------------------------------------

var rule = new schedule.RecurrenceRule();
rule.minute = new schedule.Range(0, 59, 30);

var job = schedule.scheduleJob(rule, function(){
  console.log("scheduleJob run at: ", new Date());
	 scrapePilots();
});

// Expose app
exports = module.exports = app;
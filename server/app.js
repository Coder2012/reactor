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
  var id = this.pilot + this.start + this.finish;
  this._id = id.replace(/ /g, '');
  console.log(this._id);

    FlightModel.find({_id : this._id}, function (err, docs) {
        if (!docs.length){
            next();
        }else{                
            console.log('id exists: ', id);
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
  // if the Pages array is empty, we are Done!!
  if (!Pages.length) {
    return console.log('Done!!!!');
  }
  var url = Pages.pop();
  var scraper = new Scraper(url);
  var model;
  console.log('Requests Left: ' + Pages.length);
  // if the error occurs we still want to create our
  // next request
  scraper.on('error', function (error) {
    console.log('bot error received from Scraper: ', error);
    scraper.resume();
  });
  // if the request completed successfully
  // we want to store the results in our database

  scraper.on('complete', function (models) {
    
    for (var i = 0; i < models.length; i++) {
      model = new FlightModel(models[i]);

      var id = model.pilot + model.start + model.finish;
      id = id.replace(/ /g, '');
      model._id = id;

      model.save(function(err) {
        if (err) {
          console.log('Database err saving: ' + url);
        }
      });

    }
    console.log("all models saved to MongoDB");

  });
}

//--------------------------------------------------


// var job = schedule.scheduleJob('59 * * * *', function(){
// 	console.log("message");
//   scrapePilots();
// });

var rule = new schedule.RecurrenceRule();
rule.minute = 1;
var job = schedule.scheduleJob(rule, function(){
  console.log("scheduleJob run");
	 //scrapePilots();
});

// Expose app
exports = module.exports = app;
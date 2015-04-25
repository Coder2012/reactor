'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var FlightSchema = new Schema({
	pilot: String,
	title: String,
	club: String,
	glider: String,
	date: String,
	start: String,
	finish: String,
	duration: String,
	takeoff: String,
	landing: String,
	distance: String,
	total: String,
	multiplier: String,
	score: String
});

module.exports = mongoose.model('flights', FlightSchema);
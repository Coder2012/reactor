'use strict';

var mongoose = require('mongoose');

var FlightSchema = new mongoose.Schema({
	_id: String,
	pilot: String,
	title: String,
	club: String,
	glider: String,
	date: Object,
	start: String,
	finish: String,
	duration: String,
	takeoff: String,
	landing: String,
	total: String,
	multiplier: String,
	score: String,
	maxHeight: String,
	lowHeight: String,
	takeoffHeight: String,
	maxClimb: String,
	minClimb: String,
	maxSpeed: String,
	avgSpeedCourse: String,
	avgSpeedTrack: String
});

module.exports = {
	flights: mongoose.model('flights', FlightSchema),
	schema: FlightSchema
}
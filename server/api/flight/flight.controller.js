'use strict';

var _ = require('lodash');
var Flight = require('./flight.model');
//var moment = require('')

exports.index = function(req, res) {
  console.log("index");
  Flight.find(function (err, flights) {
    if(err) { return handleError(res, err); }
    return res.json(200, flights);
  });
};

exports.getPilots = function(req, res) {
  Flight.distinct('pilot', {}, function (err, flights) {
    if(err) { return handleError(res, err); }
    return res.json(200, flights);
  });
};

exports.getTitles = function(req, res) {
  Flight.distinct('title', {}, function (err, flights) {
    if(err) { return handleError(res, err); }
    return res.json(200, flights);
  });
};

exports.getClubs = function(req, res) {
  Flight.distinct('club', {}, function (err, flights) {
    if(err) { return handleError(res, err); }
    return res.json(200, flights);
  });
};

exports.show = function(req, res) {
  console.log("show");
  Flight.findById(req.params.id, function (err, flight) {
    if(err) { return handleError(res, err); }
    if(!flight) { return res.send(404); }
    return res.json(flight);
  });
};

exports.findByPilot = function(req, res) {
  Flight.find({pilot: req.params.pilot}, function (err, flight) {
    if(err) { return handleError(res, err); }
    if(!flight) { return res.send(404); }
    return res.json(flight);
  });
};

exports.findByClub = function(req, res) {
  Flight.find({club: req.params.club}, function (err, flight) {
    if(err) { return handleError(res, err); }
    if(!flight) { return res.send(404); }
    return res.json(flight);
  });
};

exports.findByGlider = function(req, res) {
  Flight.find({glider: req.params.glider}, function (err, flight) {
    if(err) { return handleError(res, err); }
    if(!flight) { return res.send(404); }
    return res.json(flight);
  });
};

exports.findByStart = function(req, res) {
  console.log("between: start ", req.params.start);
  console.log("between: finish ", req.query.finish);
  Flight.find({start: {$gte: req.params.start}, finish: {$lte: req.query.finish}}, function (err, flight) {
    if(err) { return handleError(res, err); }
    if(!flight) { return res.send(404); }
    return res.json(flight);
  });
};

exports.findByFinish = function(req, res) {
  Flight.find({finish: req.params.finish}, function (err, flight) {
    if(err) { return handleError(res, err); }
    if(!flight) { return res.send(404); }
    return res.json(flight);
  });
};

exports.findByDuration = function(req, res) {
  Flight.find({duration: req.params.duration}, function (err, flight) {
    if(err) { return handleError(res, err); }
    if(!flight) { return res.send(404); }
    return res.json(flight);
  });
};

exports.findByTakeoff = function(req, res) {
  Flight.find({takeoff: req.params.takeoff}, function (err, flight) {
    if(err) { return handleError(res, err); }
    if(!flight) { return res.send(404); }
    return res.json(flight);
  });
};

exports.findByLanding = function(req, res) {
  Flight.find({landing: req.params.landing}, function (err, flight) {
    if(err) { return handleError(res, err); }
    if(!flight) { return res.send(404); }
    return res.json(flight);
  });
};

exports.findByDistance = function(req, res) {
  Flight.find({distance: req.params.distance}, function (err, flight) {
    if(err) { return handleError(res, err); }
    if(!flight) { return res.send(404); }
    return res.json(flight);
  });
};

exports.findByTotal = function(req, res) {
  Flight.find({total: req.params.total}, function (err, flight) {
    if(err) { return handleError(res, err); }
    if(!flight) { return res.send(404); }
    return res.json(flight);
  });
};

exports.findByMultiplier = function(req, res) {
  Flight.find({multiplier: req.params.multiplier}, function (err, flight) {
    if(err) { return handleError(res, err); }
    if(!flight) { return res.send(404); }
    return res.json(flight);
  });
};

exports.findByScore = function(req, res) {
  Flight.find({score: req.params.score}, function (err, flight) {
    if(err) { return handleError(res, err); }
    if(!flight) { return res.send(404); }
    return res.json(flight);
  });
};

// Creates a new flight in the DB.
exports.create = function(req, res) {
  Flight.create(req.body, function(err, flight) {
    if(err) { return handleError(res, err); }
    return res.json(201, flight);
  });
};

// Updates an existing flight in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Flight.findById(req.params.id, function (err, flight) {
    if (err) { return handleError(res, err); }
    if(!flight) { return res.send(404); }
    var updated = _.merge(flight, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, flight);
    });
  });
};

// Deletes a flight from the DB.
exports.destroy = function(req, res) {
  Flight.findById(req.params.id, function (err, flight) {
    if(err) { return handleError(res, err); }
    if(!flight) { return res.send(404); }
    flight.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
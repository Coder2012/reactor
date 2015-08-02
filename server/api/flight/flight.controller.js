'use strict';

var _ = require('lodash');
var Flight = require('./flight.model').flights;
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

exports.getTypes = function(req, res) {
  Flight.distinct('title', {}, function (err, flights) {
    if(err) { return handleError(res, err); }
    return res.json(200, flights);
  });
};

exports.getSites = function(req, res) {
  Flight.distinct('takeoff', {}, function (err, flights) {
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
  var limit = Number(req.params.limit);
  var page = Number(req.params.page);

  Flight.find({pilot: req.params.pilot}).sort('-date').skip((page-1)*limit)
  .limit(limit).exec(function (err, flight) {
    if(err) { return handleError(res, err); }
    if(!flight) { return res.send(404); }
    return res.json(flight);
  });
};

exports.findByClub = function(req, res) {
  var limit = Number(req.params.limit);
  var page = Number(req.params.page);
  
  Flight.find({club: req.params.club}).sort('-date').skip((page-1)*limit)
  .limit(limit).exec(function (err, flight) {
    if(err) { return handleError(res, err); }
    if(!flight) { return res.send(404); }
    return res.json(flight);
  });
};

exports.findByType = function(req, res) {
  Flight.find({title: req.params.type}, function (err, flight) {
    if(err) { return handleError(res, err); }
    if(!flight) { return res.send(404); }
    return res.json(flight);
  });
};

exports.findBySite = function(req, res) {
  Flight.find({takeoff: req.params.site}, function (err, flight) {
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

exports.findByStartTime = function(req, res) {
  Flight.find({start: req.params.start}, function (err, flight) {
    if(err) { return handleError(res, err); }
    if(!flight) { return res.send(404); }
    return res.json(flight);
  });
};

exports.findByFinishTime = function(req, res) {
  Flight.find({finish: req.params.finish}, function (err, flight) {
    if(err) { return handleError(res, err); }
    if(!flight) { return res.send(404); }
    return res.json(flight);
  });
};

exports.findByTimeRange = function(req, res) {
  Flight.find({start: {$gte: req.params.start}, finish: {$lte: req.params.finish}}, function (err, flight) {
    if(err) { return handleError(res, err); }
    if(!flight) { return res.send(404); }
    return res.json(flight);
  });
};

exports.findByDate = function(req, res) {
  var date = Number(parseDate(req.params.date));
  Flight.find({date: date}, function (err, flight) {
    if(err) { return handleError(res, err); }
    if(!flight) { return res.send(404); }
    return res.json(flight);
  });
};

exports.findByDateRange = function(req, res) {
  var startDate = Number(parseDate(req.params.start));
  var finishDate = Number(parseDate(req.params.finish));
  Flight.find({date: {$gte: startDate, $lte: finishDate}}, function (err, flight) {
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

exports.getFlightsCount = function(req, res) {
  Flight.count({}, function (err, flight) {
    if(err) { return handleError(res, err); }
    if(!flight) { return res.send(404); }
    return res.json(flight);
  });
};

exports.getFlightsByDateCount = function(req, res) {
  var date = Number(parseDate(req.params.date));
  Flight.count({date: date}, function (err, flight) {
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

function parseDate(str1){
  // str1 format should be dd/mm/yyyy. Separator can be anything e.g. / or -. It wont effect
  var dt1   = parseInt(str1.substring(0,2));
  var mon1  = parseInt(str1.substring(3,5));
  var yr1   = parseInt(str1.substring(6,10));
  var date1 = new Date(yr1, mon1-1, dt1);
  return date1;
}
'use strict';

var _ = require('lodash');
var Flight = require('./flight.model').flights;
var moment = require('moment');

exports.index = (req, res) => {
    Flight.find((err, flights) => {
        if (err) {
            return handleError(res, err); }
        return res.json(200, flights);
    });
};

// START handle initial requests for the search data

exports.getPilots = (req, res) => getDistinctData('pilot', req, res);
exports.getTitles = (req, res) => getDistinctData('title', req, res);
exports.getTypes = (req, res) => getDistinctData('title', req, res);
exports.getClubs = (req, res) => getDistinctData('club', req, res);
exports.getSites = (req, res) => getDistinctData('takeoff', req, res);

function getDistinctData(type, req, res) {
    Flight.distinct(type, {}, (err, flights) => {
        if (err) {
            return handleError(res, err); }
        return res.json(200, flights);
    });
}

// END requests for search data

exports.show = (req, res) => {
    Flight.findById(req.params.id, (err, flights) => {
        if (err) {
            return handleError(res, err); }
        if (!flights) {
            return res.send(404); }
        return res.json(flights);
    });
};

exports.findByPilot = (req, res) => {
    var limit = Number(req.params.limit);
    var page = Number(req.params.page);

    Flight.find({ pilot: req.params.pilot }).sort('-date').skip((page - 1) * limit)
        .limit(limit).exec((err, flights) => {
            if (err) {
                return handleError(res, err); }
            if (!flights) {
                return res.send(404); }
            return res.json(flights);
        });
};

exports.findByClub = (req, res) => {
    var limit = Number(req.params.limit);
    var page = Number(req.params.page);

    Flight.find({ club: req.params.club }).sort('-date').skip((page - 1) * limit)
        .limit(limit).exec((err, flights) => {
            if (err) {
                return handleError(res, err); }
            if (!flights) {
                return res.send(404); }
            return res.json(flights);
        });
};

exports.findByType = (req, res) => {
    Flight.find({ title: req.params.type }, (err, flights) => {
        if (err) {
            return handleError(res, err); }
        if (!flights) {
            return res.send(404); }
        return res.json(flights);
    });
};

exports.findBySite = (req, res) => {
    Flight.find({ takeoff: req.params.site }, (err, flights) => {
        if (err) {
            return handleError(res, err); }
        if (!flights) {
            return res.send(404); }
        return res.json(flights);
    });
};

exports.findByGlider = (req, res) => {
    Flight.find({ glider: req.params.glider }, (err, flights) => {
        if (err) {
            return handleError(res, err); }
        if (!flights) {
            return res.send(404); }
        return res.json(flights);
    });
};

exports.findByStartTime = (req, res) => {
    Flight.find({ start: req.params.start }, (err, flights) => {
        if (err) {
            return handleError(res, err); }
        if (!flights) {
            return res.send(404); }
        return res.json(flights);
    });
};

exports.findByFinishTime = (req, res) => {
    Flight.find({ finish: req.params.finish }, (err, flights) => {
        if (err) {
            return handleError(res, err); }
        if (!flights) {
            return res.send(404); }
        return res.json(flights);
    });
};

exports.findByTimeRange = (req, res) => {
    Flight.find({ start: { $gte: req.params.start }, finish: { $lte: req.params.finish } }, (err, flights) => {
        if (err) {
            return handleError(res, err); }
        if (!flights) {
            return res.send(404); }
        return res.json(flights);
    });
};

exports.findByDate = (req, res) => {
    var date = req.params.date;
    Flight.find({ date: Number(date) }, (err, flights) => {
        if (err) {
            return handleError(res, err); }
        if (!flights) {
            return res.send(404); }
        return res.json(flights);
    });
};

exports.findByDateRange = (req, res) => {
    var startDate = Number(parseDate(req.params.start));
    var finishDate = Number(parseDate(req.params.finish));
    Flight.find({ date: { $gte: startDate, $lte: finishDate } }, (err, flights) => {
        if (err) {
            return handleError(res, err); }
        if (!flights) {
            return res.send(404); }
        return res.json(flights);
    });
};

exports.findByDuration = (req, res) => {
    Flight.find({ duration: req.params.duration }, (err, flights) => {
        if (err) {
            return handleError(res, err); }
        if (!flights) {
            return res.send(404); }
        return res.json(flights);
    });
};

exports.findByLanding = (req, res) => {
    Flight.find({ landing: req.params.landing }, (err, flights) => {
        if (err) {
            return handleError(res, err); }
        if (!flights) {
            return res.send(404); }
        return res.json(flights);
    });
};

exports.findByDistance = (req, res) => {
    Flight.find({ distance: req.params.distance }, (err, flights) => {
        if (err) {
            return handleError(res, err); }
        if (!flights) {
            return res.send(404); }
        return res.json(flights);
    });
};

exports.findByTotal = (req, res) => {
    Flight.find({ total: req.params.total }, (err, flights) => {
        if (err) {
            return handleError(res, err); }
        if (!flights) {
            return res.send(404); }
        return res.json(flights);
    });
};

exports.findByMultiplier = (req, res) => {
    Flight.find({ multiplier: req.params.multiplier }, (err, flights) => {
        if (err) {
            return handleError(res, err); }
        if (!flights) {
            return res.send(404); }
        return res.json(flights);
    });
};

exports.findByScore = (req, res) => {
    Flight.find({ score: req.params.score }, (err, flights) => {
        if (err) {
            return handleError(res, err); }
        if (!flights) {
            return res.send(404); }
        return res.json(flights);
    });
};

exports.getFlightsCount = (req, res) => {
    Flight.count({}, (err, flights) => {
        if (err) {
            return handleError(res, err); }
        if (!flights) {
            return res.send(404); }
        return res.json(flights);
    });
};

exports.getFlightsByDateCount = (req, res) => {
    var date = Number(parseDate(req.params.date));
    Flight.count({ date: date }, (err, flights) => {
        if (err) {
            return handleError(res, err); }
        if (!flights) {
            return res.send(404); }
        return res.json(flights);
    });
};

// Creates a new flight in the DB.
exports.create = (req, res) => {
    Flight.create(req.body, function(err, flights) {
        if (err) {
            return handleError(res, err); }
        return res.json(201, flights);
    });
};

// Updates an existing flight in the DB.
exports.update = (req, res) => {
    if (req.body._id) { delete req.body._id; }
    Flight.findById(req.params.id, (err, flights) => {
        if (err) {
            return handleError(res, err); }
        if (!flights) {
            return res.send(404); }
        var updated = _.merge(flights, req.body);
        updated.save(function(err) {
            if (err) {
                return handleError(res, err); }
            return res.json(200, flights);
        });
    });
};

// Deletes a flight from the DB.
exports.destroy = (req, res) => {
    Flight.findById(req.params.id, (err, flights) => {
        if (err) {
            return handleError(res, err); }
        if (!flights) {
            return res.send(404); }
        flights.remove(function(err) {
            if (err) {
                return handleError(res, err); }
            return res.send(204);
        });
    });
};

function handleError(res, err) {
    return res.send(500, err);
}

function parseDate(str1) {
    // str1 format should be dd/mm/yyyy. Separator can be anything e.g. / or -. It wont effect
    var dt1 = parseInt(str1.substring(0, 2));
    var mon1 = parseInt(str1.substring(3, 5));
    var yr1 = parseInt(str1.substring(6, 10));
    var date1 = new Date(yr1, mon1 - 1, dt1);
    return date1;
}

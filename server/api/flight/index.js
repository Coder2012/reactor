'use strict';

var express = require('express');
var controller = require('./flight.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/pilots', controller.getPilots);
router.get('/titles', controller.getTitles);
router.get('/clubs', controller.getClubs);
router.get('/types', controller.getTypes);
router.get('/sites', controller.getSites);
router.get('/flightsCount', controller.getFlightsCount);
router.get('/flightsByDateCount/:date', controller.getFlightsByDateCount);

router.get('/:id', controller.show);
router.get('/pilot/:pilot', controller.findByPilot);
router.get('/pilot/:pilot/:page/:limit', controller.findByPilot);
router.get('/club/:club', controller.findByClub);
router.get('/club/:club/:page/:limit', controller.findByClub);
router.get('/type/:type', controller.findByType);
router.get('/site/:site', controller.findBySite);
router.get('/glider/:glider', controller.findByGlider);
router.get('/start-time/:start', controller.findByStartTime);
router.get('/finish-time/:finish', controller.findByFinishTime);
router.get('/time-range/:start/:finish', controller.findByTimeRange);
router.get('/date/:date', controller.findByDate);
router.get('/date-range/:start/:finish', controller.findByDateRange);
router.get('/duration/:duration', controller.findByDuration);
router.get('/landing/:landing', controller.findByLanding);
router.get('/distance/:distance', controller.findByDistance);
router.get('/total/:total', controller.findByTotal);
router.get('/multiplier/:multiplier', controller.findByMultiplier);
router.get('/score/:score', controller.findByScore);

router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
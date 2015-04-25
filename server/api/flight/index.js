'use strict';

var express = require('express');
var controller = require('./flight.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/pilots', controller.getPilots);
router.get('/titles', controller.getTitles);
router.get('/clubs', controller.getClubs);

router.get('/:id', controller.show);
router.get('/pilot/:pilot', controller.findByPilot);
router.get('/club/:club', controller.findByClub);
router.get('/glider/:glider', controller.findByGlider);
router.get('/start/:start', controller.findByStart);
router.get('/finish/:finish', controller.findByFinish);
router.get('/duration/:duration', controller.findByDuration);
router.get('/takeoff/:takeoff', controller.findByTakeoff);
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
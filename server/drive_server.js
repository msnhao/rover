var express = require('express');

function init(model, config) {
	model.drive = {
		speed: [0, 0],
		pivot: 0,
		drive_mode: true, // drive mode vs pivot mode
		temperatures: [0, 0, 0, 0, 0, 0],
		currents: [0, 0, 0, 0, 0, 0]
	}

	var router = express.Router();

	// gets rover speed and turning parameters
	router.get('/', (req, res) => {
		res.json(model.drive);
	})

	// sets rover forward speed.
	router.put('/speed/:speed', (req, res) => {
		model.drive.speed[0] = model.drive.speed[1] = req.params.speed;
		model.drive.drive_mode = true;
		res.json(model.drive);
	});

	// sets rover speed on both wheels.
	router.put('/speed/:speed0/:speed1', (req, res) => {
		model.drive.speed[0] = req.params.speed0;
		model.drive.speed[1] = req.params.speed1;
		model.drive.drive_mode = true;
		res.json(model.drive);
	});

	// sets the pivot speed of the rover. pivoting requires us to turn off
	// the middle wheels or the rocker bogie dies.
	router.put('/pivot/:turn_speed', (req, res) => {
		model.drive.pivot = req.params.turn_speed;
		model.drive.drive_mode = false;
		res.json(model.drive);
	});

	router.put('/stop', (req, res) => {
		model.drive.speed[0] = model.drive.speed[1] = 0;
		res.json(model.drive);
	});

	console.log('-> drive server started');
	return router;
}

module.exports = {init};
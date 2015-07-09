#!/usr/bin/env node

var mrt = require('./lib/mrt');

if (process.argv.length !== 3) {
	console.log('Usage: mrt 台北車站');
	return;
}

var name = process.argv[2];
mrt.findByName(name, function(err, results) {
	if (err) {
		console.error('Error:', err);
	}

	if (!results) {
		console.error('No available datas');
	}

	results.forEach(function(item) {
		console.log(item.countdown, item.destination);
	});
});
var request = require('request');
var parseString = require('xml2js').parseString;
var _ = require('lodash');
var stations = require('./stations');

var noop = function() {};

var getTime = function(id, callback) {
	// check callback is undefined
	if (!callback) {
		callback = noop;
	}

	request.post({
		url: 'http://ws.metro.taipei/trtcappweb/Traintime.asmx',
		headers: {
			'Content-Type': 'text/xml',
			'SOAPAcrion': 'http://tempuri.org/GetNextTrain2'
		},
		body: '<?xml version="1.0" encoding="UTF-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/SMLSchema"><soap:Body><GetNextTrain2 xmlns="http://tempuri.org/"><stnid>' + id + '</stnid></GetNextTrain2></soap:Body></soap:Envelope>'
	}, function(err, res, body) {
		if (err) {
			return callback(err);
		}

		if (res.statusCode !== 200) {
			return callback(res.statusCode);
		}

		parseString(body, function(err, result) {
			if (err) {
				return callback(err);
			}

			var details = result['soap:Envelope']['soap:Body'][0].GetNextTrain2Response[0].GetNextTrain2Result[0].root[0].Detail;
			if (!details) {
				return callback(null, null);
			}

			details = details.map(function(item) {
				return item.$;
			});

			callback(null, details);
		});
	});
};

// get arrival time by id
exports.findById = function(id, callback) {
	getTime(id, callback);
};

// get arrival time by station name
exports.findByName = function(name, callback) {
	var station = _.find(stations, {
		name: name
	});
	if (!station) {
		return callback('no station found');
	}

	getTime(station.id, callback);
};
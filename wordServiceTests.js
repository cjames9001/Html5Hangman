var wordService = require('./wordService.js');
var minutesPerHour = 60;

exports.canary = function (test) {
	test.equal(true, true);
	test.done();
};

exports.testNowWasInLast24Hours = function (test) {
	test.equal(true, wordService.dayWasInLast24Hours(new Date()));
	test.done();
};

exports.test12HoursAgoWasInLast24Hours = function (test) {
	var timeToTest = new Date();
	timeToTest.setMinutes(timeToTest.getMinutes() - minutesPerHour * 12);
	test.equal(true, wordService.dayWasInLast24Hours(timeToTest));
	test.done();
};

exports.test23HoursAgoWasInLast24Hours = function (test) {
	var timeToTest = new Date();
	timeToTest.setMinutes(timeToTest.getMinutes() - minutesPerHour * 23.9);
	test.equal(true, wordService.dayWasInLast24Hours(timeToTest));
	test.done();
};

exports.test24HoursAgoWasInLast24Hours = function (test) {
	var timeToTest = new Date();
	timeToTest.setMinutes(timeToTest.getMinutes() - minutesPerHour * 24);
	test.equal(false, wordService.dayWasInLast24Hours(timeToTest));
	test.done();
};

exports.test50HoursAgoWasInLast24Hours = function (test) {
	var timeToTest = new Date();
	timeToTest.setMinutes(timeToTest.getMinutes() - minutesPerHour * 50);
	test.equal(false, wordService.dayWasInLast24Hours(timeToTest));
	test.done();
};
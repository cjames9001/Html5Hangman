var httpRequestor = require('./httpRequestor.js');
var fs = require('fs');
var lastCacheTime = new Date();
var wordList = null;

exports.dayWasInLast24Hours = function (date) {
	var oneDayInMilliseconds = 1000 * 60 * 60 * 24;
	var nowInMilliseconds = new Date().getTime();
	var dateInMilliseconds = date.getTime();

	var differenceInMilliseconds = nowInMilliseconds - dateInMilliseconds;

	return ((differenceInMilliseconds / oneDayInMilliseconds) < 1);
};

var sendDataToClient = function (response) {
	response.writeHead(200, { "Content-Type": "text/plain", "Access-Control-Allow-Origin": "*" });
	response.write(wordList);
	response.end();
};

var sendErrorResponse = function (response) {
	response.writeHead(503, { "Content-Type": "text/plain" });
	response.end();
};

exports.requestWords = function (response) {
	var callback = function (error, content) {
		if (error) {
			sendErrorResponse(response);
		}
		else {
			wordList = content;
			lastCacheTime = new Date();
			sendDataToClient(response);
		}
	};

	if (!this.dayWasInLast24Hours(lastCacheTime) || wordList === null) {
		var httpOptions = httpRequestor.generateHttpOptionsForHttpRequest();
		httpRequestor.getHttpResponse(httpOptions, callback);
	}
	else if (wordList !== null) {
		sendDataToClient(response);
	}
	else {
		var readFile = function (error, data) {
			if (error) {
				sendErrorResponse(response);
			}
			else {
				wordList = data;
				sendDataToClient(response);
			}
		};
		fs.readFile('nounlist.txt', 'utf8', readFile);
	}
};
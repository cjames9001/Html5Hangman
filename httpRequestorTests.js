var httpRequestor = require('./httpRequestor.js');

exports.canary = function(test){
	test.equal(true, true);
	test.done();
}

exports.testGenerateHttpOptionsForHttpRequest = function(test){
	var httpOptions = {
	  	host: 'www.desiquintans.com',
	  	port: 80,
	  	path: '/downloads/nounlist/nounlist.txt'
	}
	test.deepEqual(httpOptions,	httpRequestor.generateHttpOptionsForHttpRequest());
	test.done();
}

exports.testGetWordsFromWebResponse = function(test){
	var httpOptions = httpRequestor.generateHttpOptionsForHttpRequest();
	var httpResponseHandlerFunction = function(error, content){
		test.equal('a', content[0]);
		test.equal('z', content[content.length-7]);
		test.done();
	}
	httpRequestor.getHttpResponse(httpOptions, httpResponseHandlerFunction);
}
var httpRequestor = require('./httpRequestor.js');

exports.requestWords = function(response){
	var callback = function(error, content){
		if(error){
		    response.writeHead(503,{"Content-Type":"text/plain"});
		    response.end();
		}
	  	else{
		  response.writeHead(200,{"Content-Type":"text/plain", "Access-Control-Allow-Origin": "*"});
		  response.write(content);
		  response.end();
		}
	}

	var httpOptions = httpRequestor.generateHttpOptionsForHttpRequest();
	httpRequestor.getHttpResponse(httpOptions, callback);
}
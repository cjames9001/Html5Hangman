var wordService = require('./wordService.js');
var webPageServer = require('./webPageServer.js');
var http = require('http');
var websiteServerPort = 9000;

var websiteServer = http.createServer(function(request, response){
  if(request.url.toString() === '/?q=getWords'){
    wordService.requestWords(response);
  }
  else{
    webPageServer.serveWebPage(request, response);
  }
});

websiteServer.listen(parseInt(websiteServerPort, 10));

console.log("Website Server running at => http://localhost:" + websiteServerPort + "/");
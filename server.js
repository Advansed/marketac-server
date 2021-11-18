var http = require("http");
var https = require("https");
var url = require("url");
var express = require('express');
const multer = require('multer')
var cors = require('cors')
var fs = require('fs');

var key = fs.readFileSync('privatekey.pem').toString();
var sert = fs.readFileSync('certificate.pem').toString();  

var options = {
	key: fs.readFileSync('privatekey.pem'),
	cert: fs.readFileSync('certificate.pem')
};

var app = express({key: key, cert: sert});
const upload = multer()

function start(route, handle) {
  function onRequest(request, response) {
	var pathname = url.parse(request.url).pathname;
	console.log("Request for " + pathname + " received.");

	ret = route(handle, pathname, request, response);

	
  }
	console.log("Request received.");

	app.use(cors())

	app.use(express.json({limit: '50mb'}));
	app.use(express.urlencoded({limit: '50mb', extended: false}));

	app.get('/', onRequest);
	app.get('/login', onRequest);
	app.post('/method', onRequest);
	app.post('/w_method', onRequest);
	app.post('/upload', upload.array('fotos', 12), onRequest);
	   
	//app.listen(3000);	
	// Create an HTTP service.
	var port1 = process.env.PORT || 3000;
	var port2 = process.env.PORT || 3010;
	http.createServer(app).listen( port1 );
	// Create an HTTPS service identical to the HTTP service.
	https.createServer(options, app).listen( port2 );
}

exports.start = start;

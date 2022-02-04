var http 		= require("http");
var https		= require("https");
var url 		= require("url");
var express 	= require('express');
const multer 	= require('multer')
var cors 		= require('cors')
var fs 			= require('fs');

var app 		= express();
const upload 	= multer()


const options = {
	key: fs.readFileSync('key.pem'),
	cert: fs.readFileSync('cert.pem')
  };

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
	   
	//app.listen(3000);	
	// Create an HTTP service.
	var port1 = process.env.PORT || 3000;
	http.createServer(app).listen( port1 );
//	https.createServer(options, app).listen(3000);
}

exports.start = start;

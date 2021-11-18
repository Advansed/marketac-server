var http 		= require("http");
var url 		= require("url");
var express 	= require('express');
const multer 	= require('multer')
var cors 		= require('cors')
var fs 			= require('fs');

var FCM = require('fcm-node');
var serverKey = 'AIzaSyC2iBWTU8RhfUVql7o92mtRhQ6Nx2Ori4g'; //put your server key here
var fcm = new FCM(serverKey);

var app = express();
const upload = multer()

var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
	to: 'drK1QawFS9G_wjA4BAqkI3:APA91bFEEQlaDZE218MeUtHItm6iR_4t-z-BmLGP2b090XD5av9ntO6yWBUsmLTCnltjMQx8uVPsw3MUUnrIXTEIYAXn9KUn3ixnSNHfaGhSQt_4dYJXo8Qm1--C9b5pz3-sTzt7Y8zr', 
	collapse_key: 'AIzaSyC2iBWTU8RhfUVql7o92mtRhQ6Nx2Ori4g',
	
	notification: {
		title: 'Test of GCM', 
		body: 'test push notification' 
	},
	
	data: {  //you can send only notification or only data(or include both)
		my_key: 'my value',
		my_another_key: 'my another value'
	}
};



function start(route, handle) {
  function onRequest(request, response) {
	var pathname = url.parse(request.url).pathname;
	console.log("Request for " + pathname + " received.");

	ret = route(handle, pathname, request, response);

	fcm.send(message, function(err, response){
		if (err) {
			console.log("Something has gone wrong!");
		} else {
			console.log("Successfully sent with response: ", response);
		}
	});
	
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
	http.createServer(app).listen( port1 );
}

exports.start = start;

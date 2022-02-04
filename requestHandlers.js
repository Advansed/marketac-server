
fs = require('fs');
var mysql = require('mssql');

const sql = require('mssql')
const sqlConfig = {
  user: 'atlasov',
  password: "10101973",
  database: 'ut',
  server: 'localhost',
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: true, // for azure
    trustServerCertificate: true // change to true for local dev / self-signed certs
  }
}

var fcm 		= require('fcm-notification');
var FCM 		= new fcm('privatekey.json');
var token 		= 'eeapUKT2QT2v748kyyItTc:APA91bGWrRX0vsZRg_XfCFaZKGXXRrfdX_BsNnUB9S9xC3zlnVpxdLgZ_pEx7tK-B347YA9FA460jjhdxnnpUrsINTjAn2U8f_X-qmspIzO01rvjF8yzJXugr4iIuCRvGpyAmEFD3-aV';
 

function start( req, res ) {
  console.log("start")	

  sendFCM( token, "Акция", " Отправляем вам промокод 240313245")

  res.end("get start")
}

function login( req, res ) {
}

function method ( req, res ) {
  console.log(req.body)
  async function getdata () {
    try {
      // make sure that any items are correctly URL encoded in the connection string
        await sql.connect(sqlConfig)
        const result = await sql.query`exec method ${req.body.method},  ${JSON.stringify(req.body)} `
//        console.dir(result)
        res.end(JSON.stringify(result.recordset))
    } catch (err) {
        console.log(err)
        res.end()
    }
  }

  getdata()
}

function sendFCM( token, title, text ) {

  var message = {
    notification:{
        title : title,
        body : text
    },
        token : token
    };


  FCM.send(message, function(err, response) {
		if(err){
			console.log('error found', err);
		}else {
			console.log('response here', response);
		}
	})

}

exports.start     = start;
exports.login     = login;
exports.method    = method;
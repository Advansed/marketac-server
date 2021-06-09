
fs = require('fs');
var mysql = require('mssql');

const sql = require('mssql')
const sqlConfig = {
  user: 'atlasov',
  password: "hirosima",
  database: 'ut',
  server: 'localhost',
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: true, // for azure
    trustServerCertificate: false // change to true for local dev / self-signed certs
  }
}

async () => {
 try {
  // make sure that any items are correctly URL encoded in the connection string
  await sql.connect(sqlConfig)
  const result = await sql.query`select * from mytable where id = ${value}`
  console.dir(result)
 } catch (err) {
  // ... error checks
 }
}


function start( req ) {
  console.log("start")
  return "Get Started"
}

function login( req, res ) {

  var txt = "call login(?, ?)";
  console.log(req.body)
  client.query(txt, [req.body.phone, req.body.pass], function(err, res){
      if(err) throw err; var json = res[0];
      return JSON.stringify(json)
      //socket.emit("login", json);
  });

  return "login"

}
function method ( req, res ) {
  console.log(req.body)
  try {
    // make sure that any items are correctly URL encoded in the connection string
      await sql.connect(sqlConfig)
      const result = await sql.query`exec method(  ${req.body.method},  ${req.body})`
      console.dir(result)
      res.end(JSON.stringify(result))
   } catch (err) {
      res.end()
   }

}


exports.start     = start;
exports.login     = login;
exports.method    = method;
exports.w_method  = w_method;
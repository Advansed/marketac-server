
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

function start( req, res ) {
  console.log("start")
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


exports.start     = start;
exports.login     = login;
exports.method    = method;
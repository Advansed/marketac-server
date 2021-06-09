const { METHODS } = require('http');
var mysql = require('mysql2');

var client = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'ubuntu',
  password : 'Tattoka2017',
  database : 'print-server'
});

//client.connect();

function    listen(socket){

    socket.on("login",          function( req ){ login(socket,            req)});

    socket.on("registration",   function( req ){ registration(socket,     req)});

    socket.on("method",         function( req ){ method(socket,           req)});

    socket.on("services",       function( req ){ services(socket,         req)});

    socket.on("cargos",         function( req ){ cargos(socket,           req)});

    socket.on("franchaise",     function( req ){ franchaise(socket,       req)});

    socket.on("s_service",      function( req ){ s_service(socket,        req)});

    socket.on("papers",         function( req ){ papers(socket,           req)});

    socket.on("sizes",          function( req ){ sizes(socket,            req)});

    socket.on("i_order",        function( req ){ i_order(socket,          req)})

}

function    login(socket, req){
    var txt = "call login(?, ?)";
    console.log(req)
    client.query(txt, [req.phone, req.pass], function(err, res){
        if(err) throw err; var json = res[0];
        socket.emit("login", json);
    });
}

function    registration(socket, req){
    var txt = "call registration(?)";
    client.query(txt, JSON.stringify(req), function(err, res){
        if(err) throw err; var json = res[0];
        socket.emit("registration", json);
    });
}

function    services(socket, req){
    var txt = "select * from services";
    client.query(txt, function(err, res){
        if(err) throw err; 
        socket.emit("services", res);
    });
}

function    cargos(socket, req){
    var txt = "select * from cargos";
    client.query(txt, function(err, res){
        if(err) throw err; 
        socket.emit("cargos", res);
    });
}

function    franchaise(socket, req){
    var txt = "call franchaise";
    client.query(txt, function(err, res){
        if(err) throw err; 
        socket.emit("franchaise", res[0]);
    });
}

function    s_service(socket, req){
    var txt = "call s_service( ? )";
    console.log(req)
    client.query(txt, JSON.stringify(req), function(err, res){
        if(err) throw err;
    });
}

function    papers(socket, req){
    var txt = "select * from papers";
    client.query(txt, JSON.stringify(req), function(err, res){
        if(err) throw err; 
        socket.emit("papers", res); 
    });    
}

function    sizes(socket, req){
    var txt = "select * from sizes";
    client.query(txt, JSON.stringify(req), function(err, res){
        if(err) throw err; 
        socket.emit("sizes", res); 
    });    
}

function    i_order(socket, req){
    var txt = "call i_order( ?, ?)";
    client.query(txt, [req.phone, req.service], function(err, res){
        if(err) throw err; 
        socket.emit("i_order", res[0]); 
    });  
}

function    method(socket, req){
    console.log(req)
    var txt = "call method( ?, ? )";
    client.query(txt, [req.method, JSON.stringify(req)], function(err, res){
        if(err) throw err; 
        console.log(res);
        socket.emit("method_" + req.method, res); 
    });  
}

exports.listen = listen;

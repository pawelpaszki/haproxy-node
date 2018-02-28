//
// # Node Express Demo
//
// A simple web application using Express and Pug templating engine.
//

// import necessary modules
var http = require('http');
var https = require('https');
var path = require('path');
var express = require('express');
var logger = require('morgan');
var fs = require('fs');

var options = {
    key: fs.readFileSync('./server.key'),
    cert: fs.readFileSync('./server.crt'),
    requestCert: false,
    rejectUnauthorized: false
};

// instantiate Express application
var expressApp = express();

// create http server for expressApp
var server = http.createServer(expressApp);

// tells expressApp to look for files in `client` directory
expressApp.use(express.static(path.resolve(__dirname, 'client')));

// import routes
var routes = require('./routes');

// tells expressApp to look for our views in the `views` directory
expressApp.set('views', path.join(__dirname, 'views'));

// sets view engine to pug
expressApp.set('view engine', 'pug');

// sets up logger to log http requests to your application
expressApp.use(logger('dev'));

// sends '/' requests to routes
expressApp.use('/', routes);

// starts server listening on port defined for environment (defaults to 3000)
server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Node demo listening at", addr.address + ":" + addr.port);
});

https.createServer(options, expressApp).listen(443);

/**
* JavaScript CHARTS - POC Work
*
* Created by: Kevin Chisholm
* May 10, 2016
*/

'use strict';

var appPort = process.env.OPENSHIFT_NODEJS_PORT || 5000,
  appIpaddress = process.env.OPENSHIFT_NODEJS_IP,
  fs = require('fs'),
  express = require('express'),
  bodyParser = require('body-parser'),
  app = express(),
  initApp = function () {
  if (typeof appIpaddress === 'undefined') {
      console.warn('No OPENSHIFT_NODEJS_IP var, using 127.0.0.1');
      appIpaddress = '127.0.0.1';
  }

  app.listen(appPort, appIpaddress, function () {
    console.log('%s: Node server started on %s:%d ...',
    Date(Date.now() ), appIpaddress, appPort);
  });
};

  //Configure express to use body-parser as middle-ware.
  app.use(bodyParser.urlencoded({ extended: false }));

  //set the port
  app.configure(function () {
    app.set('port', appPort);
  });

  //default
  app.get('/',function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(fs.readFileSync('www/index.html'));
  });

  app.get('/html',function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(fs.readFileSync('www/html/home.html'));
  });

  app.get('/html/:fileName',function (req, res) {
    var file = 'www/html/' + req.params.fileName;

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(fs.readFileSync(file));
  });

  //JavaSript requests
  app.get('/js/:fileName', function (req, res) {
    var file = 'www/js/' + req.params.fileName;

    res.writeHead(200, {'Content-Type' : 'application/x-javascript'});

    res.end(fs.readFileSync(file));
  });

  //CSS requests
  app.get('/css/:fileName', function (req, res) {
    var file = 'www/css/' + req.params.fileName;

    res.writeHead(200, {'Content-Type': 'text/css'});

    res.end(fs.readFileSync(file));
  });

  app.get('/api/user', function(req, res) {
    var file = 'app/usage.json';

    res.writeHead(200, {'Content-Type' : 'application/json'});

    res.end(fs.readFileSync(file));
  });

//start the application
initApp();
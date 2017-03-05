// set up ======================================================================
var express = require('express');      // node.js framework w/ HTTP utility methods and middleware to create a robust API
var app = express();                   // create our app w/ express
var mongoose = require('mongoose');    // mongoose for mongodb
var port = process.env.PORT || 8081;   // set the port
var database = require('./config/database');  // load the database config
var morgan = require('morgan');               // HTTP request logger middleware for node.js
var bodyParser = require('body-parser');      // Node.js body parsing middleware
var methodOverride = require('method-override'); // simulates DELETE and PUT (_method / app.post / app.put
// configuration ===============================================================
//mongoose.connect(database.localUrl);            // Connect to local MongoDB instance
mongoose.connect(database.herokuUrl);         // Connect to remoteUrl MongoDB instance
app.use(express.static('./app'));               // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                         // log every request to the console
app.use(bodyParser.urlencoded({'extended': 'true'}));          // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                    // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'}));  // parse application/vnd.api+json as json
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request
// routes ======================================================================
require('./server/routes.js')(app);
// listen (start app with node server.js) ======================================
app.listen(port);console.log("App listening on port " + port);
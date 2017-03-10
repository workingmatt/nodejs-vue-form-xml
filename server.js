//Test server

var fs = require('fs');
var express = require('express');
var https = require('https');
var http = require('http');
var port = process.env.PORT || 3000;
var httpsKey = fs.readFileSync('fcms-key.pem');
var httpsCert = fs.readFileSync('fcms-cert.pem');
var httpsOptions = {
	key: httpsKey,
	cert: httpsCert
};
var bodyParser = require('body-parser');
var path = require('path');

var app = express();
app.use(express.static(__dirname+'/public'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.set('view engine', 'ejs');
app.set('views', __dirname+'/public');
app.engine('html', require('ejs').renderFile);

require('./src/routes.js')(app);

var server = https.createServer(httpsOptions, app);
//var server = http.createServer(app);
server.listen(port, function() {
	console.log("Running server on port "+port);
});

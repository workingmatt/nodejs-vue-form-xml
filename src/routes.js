var helpers = require('./helpers.js');

module.exports = function(app){

	app.get('/', function(req,res){
		res.render('index.html');
	});

	app.post('/', function(req,res){
		console.log(req.body);
		helpers.sendFileList(res);
	});

	app.post('/forms', function (req, res){
		console.log('Rxd post');

		var filename = '../xmlfiles/'+req.body.Platform +'_'+req.body.Subsystem+'.xml';
		helpers.writeXmlFile(helpers.processJsonToAveriti(req.body), filename);
		res.send("New file created");
	});

	app.post('/edit', function(req,res){
		console.log("Server received request to edit "+req.body.filename);
		helpers.processAveritiToJson(req.body.filename, res);
		
	});

	app.post('/delete', function(req,res){
		console.log("post delete worked");
		helpers.deleteFile(req.body.filename, res);
//		res.send("done da delete");
	});

}
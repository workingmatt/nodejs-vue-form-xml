var helpers = require('./helpers.js');
module.exports = function(app){

	app.get('/', function(req,res){
		res.render('index.html');
	});

	app.get('/forms', function(req,res){
		res.render('form.html');
	});

	app.post('/post', function (req, res){
		console.log('Rxd post');

		//TODO Convert the returned Json into an XML file.
		console.log('doing');
		console.log(helpers.processJsonToAveriti(req.body));
		console.log('done');
	});

}
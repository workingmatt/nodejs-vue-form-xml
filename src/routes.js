var helpers = require('./helpers.js');

module.exports = function(app){

	app.get('/', function(req,res){
		res.render('index.html');
	});

	app.post('/', function(req,res){
		helpers.sendFileList(res);
	});

	app.post('/forms', function (req, res){
		console.log('Rxd post');

		var filename = '../xmlfiles/'+req.body.Platform +'_'+req.body.Subsystem+'.xml';
		helpers.writeXmlFile(helpers.processJsonToAveriti(req.body), filename);

// TODO Try async to send back result of file write to client with 
//		res.send(answer); here and the following in app.js (client side)
//		this.$http.post('/forms', msg).then(function(response){
//				console.log('***');
//				console.log(response.body);
//			});
	});

}
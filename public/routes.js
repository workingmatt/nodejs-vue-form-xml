module.exports = function(app){

	app.get('/', function(req,res){
		res.render('index.html');
	});

	app.get('/forms', function(req,res){
		res.render('form.html');
	});

	app.post('/post', function (req, res){
		console.log('Rxd post');
		console.log(req.body);
	});

}
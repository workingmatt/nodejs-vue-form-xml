module.exports = function(app){

	app.get('/', function(req,res){
		res.render('index.html');
	});

	app.get('/forms', function(req,res){
		res.render('form.html');

});

}
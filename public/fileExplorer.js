//indexApp.js
new Vue({
	el: '#fileExplorer',

	data: {
		path: '../xmlfiles/',
		files: ['one','two']
	},

	created: function(){
		//this.getFileList();
	},

	methods: {
		refreshButtonClicked: function(){
			console.log('Refresh');
			
			this.$http.post('/',{String:'picachu'}).then(function(req,res){
				console.log('success');
				this.files = req.body;
			},
			function(err){
				console.log('fail');
				console.log(err);
			});
		},

		newButtonClicked: function(){
			console.log('new button');
			//used <a href> instead in fileExplorer.html
		}
	}

});
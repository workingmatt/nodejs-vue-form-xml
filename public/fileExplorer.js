//fileExplorer.js

//TODO
//change form into a component
//use props or eventbus to pass selected file/new to form
//form shows data from file (de-xmled) or has empty fields
//form button would overwrite any existing xml (good)

var vueApp = new Vue({
	el: '#fileExplorer',

	data: {
		path: '../xmlfiles/',
		files: ['one','two'],
		showFiles: true,
		showForm: false
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
			var blankXml = '';
			passDataToForm(blankXml);
		},
		
		editButtonClicked: function(index){
			console.log('edit row '+index);
			var xmlToSend = '';
			//get file name of row(index)
			//get file into memory
			passDataToForm(xmlToSend);
		},

		passDataToForm: function(xmlToSend){
			console.log('passing data to form');
			//take xmlToSend and convert into appropriate json
			//send json to form for editing
			//must accept empty fields

		}
		
	}

});
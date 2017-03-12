//app.js

var app = new Vue({
	el: '#vueComponent',

	data: {
		files: [],
		allForms: [],
		index: 0,
		showFilesFlag: true,
		showFormFlag: false,
		form: {
			Platform: '', 
			Subsystem: '',
			Category: '',
			FunctionalArea:'',
			LayerPhysical:'',
			LayerApplication:'',
			LayerIntegration:'',
			MadeOf:'',
			array_madeOf:[],
			PartOf:'',
			array_partOf:[],
			AdjacentFrom:'',
			array_adjFrom:[],
			AdjacentTo:{name:'',function:''},
			array_adjTo: [],
			version_number:'',
			functional_description:'',
			associated_standards:'',
			interfaces:'',
			capabilities_limitations:'',
			observation_info:'',
			program_replacement_date: new Date(),
			program_component_obsolesence_date: new Date(),
			program_cease_production_date: new Date(),
			manufacturer:'',
			id:'',
			references:''
		},


	},

	mounted: function(){
		console.log('waiting');
		//if (localStorage.getItem('fcmsLocalFiles')!=""){
		//	this.allForms = localStorage.getItem('fcmsLocalFiles');
		//} else {
		//	console.log("No local forms found");
		//}
	},

	beforeDestroy: function(){
		localStorage.setItem('fcmsLocalFiles',"wicked");
		//this.allForms = [];
	},

	methods: {
		showFiles: function(){
			console.log("toggling files display");
			this.showFilesFlag = !showFilesFlag;
		},

		showForm: function(){
			this.showFormFlag = true;
			this.showFilesFlag = false;
		},

		editFile: function(index){
			console.log("editFile index="+index);
		},

		saveForm: function(form){
			console.log("Saving form");
			var obj = JSON.parse(form);
			console.log(obj);
			this.allForms[this.index] = obj;

			//store locally and on server
			localStorage.setItem('fcmsLocalFiles', JSON.stringify(this.allForms));
			this.$http.post('/forms', form);

			//Hide form, show files
			this.showFormFlag = false;
			this.showFilesFlag = true;
			//var retrievedObject = localStorage.getItem('fcmsLocalFiles');
			//console.log(retrievedObject);
		}
	}

});
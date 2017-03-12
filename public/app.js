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
			observation_information:'',
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

		editXmlForm: function(filename){
			filename = '../xmlfiles/'+filename;
			console.log("editFile filename="+filename);
			this.$http.post('/edit',{filename:filename}).then(function(res){
				var _objToBeEdited = JSON.parse(res.body);
				this.form.Platform = _objToBeEdited.subsystem.platform_name[0];
				this.form.Subsystem = _objToBeEdited.subsystem.subsystem_name[0];
				this.form.FunctionalArea = _objToBeEdited.subsystem.functional_area[0];
				this.form.Category = _objToBeEdited.subsystem.category[0];
				this.form.LayerPhysical = _objToBeEdited.subsystem.layer_physical[0];
				this.form.LayerApplication = _objToBeEdited.subsystem.layer_application[0];
				this.form.LayerIntegration = _objToBeEdited.subsystem.layer_integration[0];
				this.form.array_madeOf = _objToBeEdited.subsystem.made_of;
				this.form.array_partOf = _objToBeEdited.subsystem.part_of;
				this.form.array_adjFrom = _objToBeEdited.subsystem.adjacent_from;
				for (thing in _objToBeEdited.subsystem.adjacent_to) {
					this.form.array_adjTo[thing] = _objToBeEdited.subsystem.adjacent_to[thing];
					this.form.array_adjTo[thing].name = _objToBeEdited.subsystem.adjacent_to[thing].adjacent_to_name[0];
					this.form.array_adjTo[thing].function = _objToBeEdited.subsystem.adjacent_to[thing].adjacent_to_function[0];
				}
				this.form.array_adjTo = _objToBeEdited.subsystem.adjacent_to;
				this.form.version_number = _objToBeEdited.subsystem.version_number[0];
				this.form.functional_description = _objToBeEdited.subsystem.functional_description[0];
				this.form.associated_standards = _objToBeEdited.subsystem.associated_standards[0];
				this.form.interfaces = _objToBeEdited.subsystem.interfaces[0];
				this.form.capabilities_limitations = _objToBeEdited.subsystem.capabilities_limitations[0];
				this.form.observation_information = _objToBeEdited.subsystem.observation_information[0];
				this.form.program_replacement_date = _objToBeEdited.subsystem.program_replacement_date[0];
				this.form.program_component_obsolesence_date = _objToBeEdited.subsystem.program_component_obsolesence_date[0];
				this.form.program_cease_production_date = _objToBeEdited.subsystem.program_cease_production_date[0];
				this.form.manufacturer = _objToBeEdited.subsystem.manufacturer[0];
				this.form.id = _objToBeEdited.subsystem.id[0];
				this.form.references = _objToBeEdited.subsystem.references[0];
				this.showForm();
			},
			function(err){
				console.log('fail');
				console.log(err);
			});
		},

		saveForm: function(form){
			console.log("Saving form");
			var obj = JSON.parse(form);
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
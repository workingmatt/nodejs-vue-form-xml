//components.js

Vue.component('compFileList', {
	props: ['allForms'],
	data: function(){
		return {
			localForms: [],
			serverFiles: []
		}
	},
	template: `
		<div>
			<div class="col-md-12 btn-toolbar">
				<button class="btn btn-secondary btn-sm" v-on:click="refreshButtonClicked()">Refresh File List</button>
				<button class="btn btn-secondary btn-sm" v-on:click="newButtonClicked()">New</button>
			</div>
			<br><br>
			<div class="col-md-6">
				<div class="panel panel-default">
					<div class="panel-heading">Server files (if connected)</div>
					<div class="panel-body">
						<div class="list-group">
							<p class="list-group-item btn-toolbar" v-for="(file,idx) in serverFiles">
								{{file}}
								<button class="btn btn-secondary btn-sm pull-right" v-on:click="editButtonClicked(file)">Edit</button>
								<button class="btn btn-danger btn-sm pull-right" v-on:click="deleteButtonClicked(file)">Delete</button>
							</p>
						</div>
					</div>
				</div>
			</div>
			<br>
		</div>`,
	methods: {
		refreshButtonClicked: function(){
			console.log('Refreshing lists');

			//Get local list
			this.localForms = this.allForms.slice();

			//get server list
			this.$http.post('/',{String:'foo'}).then(function(res){
				this.serverFiles = res.body;
			},
			function(err){
				console.log('Refresh fail');
				console.log(err);
			});
		},
		newButtonClicked: function(){
			//open blank form
			this.$emit("event_toggle_form"); //picked up in index.html then app.js showForm()

		},
		editButtonClicked: function(filename){
			//edit the file this button is listed with
			this.$emit("event_edit_xml_form",filename);
		},

		deleteButtonClicked: function(filename){
			this.$emit("event_delete_xml_file", filename);
		},

		flushLocalFiles: function(){ //not used
			localStorage.setItem('fcmsLocalFiles',"");
		}
	}
})
//Validation of props explained https://vuejs.org/v2/api/#props
Vue.component('compForm',{
	props: ['file','showFormFlag','form'],
	data: function() {
		return {
			allForms: [],
			index: 0,
			localForm: this.form,
			
			optionsCategory: [
			{text:''},
			{text:'Physical'},
			{text:'Application'}
		],

		optionsFunctionalArea: [
			{text:''},
			{text:'Sensor Systems'},
			{text:'Stores or Weapons'},
			{text:'ESM and Defensive Aids'},
			{text:'Navigation'},
			{text:'Communications'},
			{text:'Mission Computing'},
			{text:'External Interfaces'},
			{text:'Display or Operator Interfaces'},
			{text:'Mission Support Systems'},
			{text:'Engineering Support Systems'}
		],

		optionsLayerPhysical: [
			{text:''},
			{text:'Wide Area Access'},
			{text:'Sub-System Processing'},
			{text:'LANS, Databases and Servers'},
			{text:'Interfaces, User Terminals, Displays and Applications'},
			{text:'External Support Systems'}
		],

		optionsLayerApplication: [
			{text:''},
			{text:'Client Application'},
			{text:'Server Application'},
			{text:'External Application'}
		],

		optionsLayerIntegration: [
			{text:''},
			{text:'Physical Layer'},
			{text:'Virtualisation Layer'},
			{text:'Operating System Layer'},
			{text:'Application Layer'}
		],

		optionsAdjacentToFunction: [
			{text:''},
			{text:'Command'},
			{text:'Status'},
			{text:'Data'},
			{text:'Not Defined'}
		]

		}
	},

	computed: {
		flag: function(){
			flag = this.showFormFlag;

			console.log("computing "+flag);
		}
	},

	watch: {
		form: function(){
			console.log('form watch triggered');
		},
		localForm: function(){
			console.log('localForm watch triggered');
		},
		flag: function(){
			console.log('flag triggered');
		},
		showFormFlag: function(){
			console.log('showFormFlag triggered');
		},
		index: function() {
			console.log('index changed');
		}
	},

	template: `
		<div>
			<div class="col-md-12">
				<button class="btn btn-success input-block-level form-control" v-on:click="btnRefresh()">Refresh Form</button>
				<button class="btn btn-danger input-block-level form-control" v-on:click="submitForm(index)">Save</button>
				<button Class="btn btn-secondary input-block-level form-control" v-on:click="cancelForm()">Cancel</button>
				<div class="col-md-6">
					<div class="panel panel-default">
						<div class="panel-heading">Enter details for xml file</div>
						<div class="panel-body">
							Platform: <input class="form-control" v-model="localForm.Platform">
							Subsystem: <input class="form-control" v-model="localForm.Subsystem">
							Category: <br>
								<select v-model="localForm.Category">
									<option v-for="optionCategory in optionsCategory" v-bind:value="optionCategory.text">{{optionCategory.text}}</option>
								</select><br>
							Functional Area:<br>
								<select v-model="localForm.FunctionalArea">
									<option v-for="optionFuncArea in optionsFunctionalArea" v-bind:value="optionFuncArea.text">{{optionFuncArea.text}}</option>
								</select><br>
							Physical Layer:<br>
								<select v-model="localForm.LayerPhysical">
									<option v-for="optionLayerPhysical in optionsLayerPhysical" v-bind:value="optionLayerPhysical.text">{{optionLayerPhysical.text}}</option>
								</select><br>
							Application Layer:<br>
								<select v-model="localForm.LayerApplication">
									<option v-for="optionLayerApplication in optionsLayerApplication" v-bind:value="optionLayerApplication.text">{{optionLayerApplication.text}}</option>
								</select><br>
							Integration Layer:<br>
								<select v-model="localForm.LayerIntegration">
									<option v-for="optionLayerIntegration in optionsLayerIntegration" v-bind:value="optionLayerIntegration.text">{{optionLayerIntegration.text}}</option>
								</select><br>
						</div>
					</div>
				</div>
				<div class="col-md-3">
					<div class="panel panel-default">
						<div class="panel-heading">Made Of</div>
						<div class="panel-body">
							Made Of:<br>
								<input class="form-control" v-model="localForm.made_of">
								<button class="btn btn-primary" v-on:click="addMadeOf()">Add Made Of</button>
								<div class="list-group">
									<p class="list-group-item" v-for="(item,idx) in localForm.array_madeOf">{{item}}
										<button class="btn btn-secondary btn-sm" v-on:click="deleteElement('madeOf',idx)">Delete</button></p>
								</div>
						</div>
					</div>
					<div class="panel panel-default">
						<div class="panel-heading">Part Of</div>
						<div class="panel-body">
							Part Of:<br>
								<input class="form-control" v-model="localForm.part_of">
								<button class="btn btn-primary" v-on:click="addpart_of()">Add Part Of</button>
								<div class="list-group">
									<p class="list-group-item" v-for="(item,idx) in localForm.array_part_of">{{item}}
									<button class="btn btn-secondary btn-sm" v-on:click="deleteElement('part_of',idx)">Delete</button></p>
								</div>
						</div>
					</div>
				</div>
				<div class="col-md-3">
					<div class="panel panel-default">
						<div class="panel-heading">Adjacent From</div>
						<div class="panel-body">
							Adjacent From:<br>
								<input class="localForm-control" v-model="localForm.adjacent_from">
								<button class="btn btn-primary" v-on:click="addadj_from()">Add Adjacent From</button>
								<div class="list-group">
									<p class="list-group-item" v-for="(adj,idx) in localForm.array_adj_from">{{adj}}
									<button class="btn btn-secondary btn-sm" v-on:click="deleteElement('adjacent_from',idx)">Delete</button></p>
									</p>
								</div>
						</div>	
						<div class="panel-heading">Adjacent To</div>
						<div class="panel-body">
							Adjacent To Name:<br>
								<input class="localForm-control" v-model="localForm.adjacent_to.adjacent_to_name">
							Adjacent To Function:<br>
								<select v-model="localForm.adjacent_to.adjacent_to_function">
									<option v-for="optionAdjacentToFunction in optionsAdjacentToFunction" v-bind:value="optionAdjacentToFunction.text">{{optionAdjacentToFunction.text}}</option>
								</select>
								<button class="btn btn-primary" v-on:click="addadj_to()">Add Adjacent To</button>
								<div class="list-group">
									<p class="list-group-item" v-for="(adj,idx) in localForm.array_adj_to">{{adj.adjacent_to_name}} : {{adj.adjacent_to_function}}
									<button class="btn btn-secondary btn-sm" v-on:click="deleteElement('adjacent_to',idx)">Delete</button></p>
									</p>
								</div>
						</div>
					</div>
				</div>
				</div>
				<div class="col-md-12">
					<div class="col-md-6">
						<div class="panel panel-default">
							<div class="panel-heading">Enter details for xml file</div>
							<div class="panel-body">
								Functional Description: <input class="form-control" v-model="localForm.functional_description">
								Associated Standards: <input class="form-control" v-model="localForm.associated_standards">
								Interfaces: <input class="form-control" v-model="localForm.interfaces">
								Capabilities and Limitations: <input class="form-control" v-model="localForm.capabilities_limitations">
								Observation Information: <input class="form-control" v-model="localForm.observation_information">
								Program Replacement Date: <input type="date" class="form-control" v-model="localForm.program_replacement_date">
							</div>
						</div>
					</div>
					<div class="col-md-6">
						<div class="panel panel-default">
							<div class="panel-heading">Enter details for xml file</div>
							<div class="panel-body">
								Program Component Obsolesence Date: <input type="date" class="form-control" v-model="localForm.program_component_obsolesence_date">
								Program Cease Production Date: <input type="date" class="form-control" v-model="localForm.program_cease_production_date">
								Manufacturer: <input class="form-control" v-model="localForm.manufacturer">
								ID: <input class="form-control" v-model="localForm.id">
								References: <input class="form-control" v-model="localForm.references">
								Version Number: <input class="form-control" v-model="localForm.version_number">
							</div>
						</div>
					</div>
				</div>
				<div class="col-md-12">
					<button class="btn btn-danger input-block-level form-control" v-on:click="submitForm(index)">Save</button>
					<button Class="btn btn-secondary input-block-level form-control" v-on:click="cancelForm()">Cancel</button>
				</div>
		</div>`,
		methods: {
			btnRefresh: function() {
				console.log("btnRefresh pressed");
				this.localForm = this.form;
			},
			submitForm: function(index){
				this.allForms[index]=this.localForm;
				var msg = {
					Platform:this.localForm.Platform,
					Subsystem:this.localForm.Subsystem,
					Category:this.localForm.Category,
					FunctionalArea:this.localForm.FunctionalArea,
					LayerPhysical:this.localForm.LayerPhysical,
					LayerApplication:this.localForm.LayerApplication,
					LayerIntegration:this.localForm.LayerIntegration,
					MadeOf:JSON.stringify(this.localForm.array_madeOf),
					part_of:JSON.stringify(this.localForm.array_part_of),
					adjacent_from:JSON.stringify(this.localForm.array_adj_from),
					adjacent_to:JSON.stringify(this.localForm.array_adj_to),
					version_number:this.localForm.version_number,
					functional_description:this.localForm.functional_description,
					associated_standards:this.localForm.associated_standards,
					interfaces:this.localForm.interfaces,
					capabilities_limitations:this.localForm.capabilities_limitations,
					observation_information:this.localForm.observation_information,
					program_replacement_date: this.localForm.program_replacement_date,
					program_component_obsolesence_date: this.localForm.program_component_obsolesence_date,
					program_cease_production_date: this.localForm.program_cease_production_date,
					manufacturer:this.localForm.manufacturer,
					id:this.localForm.id,
					references:this.localForm.references
				};

				this.$emit("event_save_form", JSON.stringify(msg));//pass msg to app.js
				
				this.localForm = {
					Platform: '',
					Subsystem: '',
					Category: '',
					FunctionalArea: '',
					LayerPhysical: '',
					LayerApplication:'',
					LayerIntegration:'',
					made_of:'',
					array_madeOf:[],
					part_of:'',
					array_part_of:[],
					adjacent_from:'',
					array_adj_from:[],
					adjacent_to:{adjacent_to_name:'',adjacent_to_function:''},
					array_adj_to:[],
					version_number:'',
					functional_description:'',
					associated_standards:'',
					interfaces:'',
					capabilities_limitations:'',
					observation_information:'',
					program_replacement_date: new Date("2001-01-01"),
					program_component_obsolesence_date: new Date("2001-01-01"),
					program_cease_production_date: new Date("2001-01-01"),
					manufacturer:'',
					id:'',
					references:''
				};

				this.index = this.allForms.length;
			},

			cancelForm: function(){
				this.localForm = {
					Platform: '',
					Subsystem: '',
					Category: '',
					FunctionalArea: '',
					LayerPhysical: '',
					LayerApplication:'',
					LayerIntegration:'',
					made_of:'',
					array_madeOf:[],
					part_of:'',
					array_part_of:[],
					adjacent_from:'',
					array_adj_from:[],
					adjacent_to:{adjacent_to_name:'',adjacent_to_function:''},
					array_adj_to:[],
					version_number:'',
					functional_description:'',
					associated_standards:'',
					interfaces:'',
					capabilities_limitations:'',
					observation_information:'',
					program_replacement_date: "2001-01-01",//new Date("2001-01-01"),
					program_component_obsolesence_date: "2001-01-01",//new Date("2001-01-01"),
					program_cease_production_date: "2001-01-01",//new Date("2001-01-01"),
					manufacturer:'',
					id:'',
					references:''
				};

				this.$emit("event_cancel_form");
			},

			deleteElement: function(type,index){
				if(index>-1){
					if(confirm('Are you sure you want to delete that?')){
						if (type=='madeOf'){
							this.localForm.array_madeOf.splice(index,1);
						}else if (type=='part_of'){
							this.localForm.array_part_of.splice(index,1);
						}else if (type=='adjacent_to'){
							this.localForm.array_adj_to.splice(index,1);
						} else if (type=='adjacent_from'){
							this.localForm.array_adj_from.splice(index,1);
						} else {
							console.log('Error in type of thing to delete');
						}
					}
				}
			},

			addadj_from: function(){
				this.localForm.array_adj_from.push(this.localForm.adjacent_from);
				this.localForm.adjacent_from='';
			},

			addadj_to: function(){
				this.localForm.array_adj_to.push({adjacent_to_name:this.localForm.adjacent_to.adjacent_to_name, adjacent_to_function:this.localForm.adjacent_to.adjacent_to_function});
				this.localForm.adjacent_to.adjacent_to_name = '';
				this.localForm.adjacent_to.adjacent_to_function = '';
			},

			addMadeOf: function(){
				this.localForm.array_madeOf.push(this.localForm.made_of);
				this.localForm.made_of='';
			},

			addpart_of: function(){
				this.localForm.array_part_of.push(this.localForm.part_of);
				this.localForm.part_of='';
			},

		}
})

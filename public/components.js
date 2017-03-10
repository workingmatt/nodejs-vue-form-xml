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
			<div class="col-md-12">
				{{allForms}}<br>
				<button class="btn btn-secondary btn-sm" v-on:click="refreshButtonClicked()">Refresh File List</button>
				<button class="btn btn-secondary btn-sm" v-on:click="newButtonClicked()">New</button>
				<button class="btn btn-secondary btn-sm" v-on:click="flushLocalFiles()">Flush Local Files</button>
			</div>
			<br><br>
			<div class="col-md-6">
				<div class="panel panel-default">
					<div class="panel-heading">Server files (if connected)</div>
					<div class="panel-body">
						<div class="list-group">
							<p class="list-group-item" v-for="(file,idx) in serverFiles">{{file}}
							<button class="btn btn-secondary btn-sm" v-on:click="editButtonClicked()">Edit</button>
							</p>
						</div>
					</div>
				</div>
			</div>
			<div class="col-md-6">
				<div class="panel panel-default">
					<div class="panel-heading">Local files</div>
					<div class="panel-body">
						<div class="list-group">
							<p class="list-group-item" v-for="(form,idx) in localForms">{{form}}
							<button class="btn btn-secondary btn-sm" v-on:click="editButtonClicked()">Edit</button>
							</p>
						</div>
					</div>
				</div>
			</div>
			<br>
		</div>`,
	methods: {
		flushLocalFiles: function(){
			console.log("flushing local files");
			localStorage.setItem('fcmsLocalFiles',"");
		},

		refreshButtonClicked: function(){
			console.log('Refreshing lists');

			//Get local list
			console.log("parsing this: ");
			console.log(JSON.stringify(this.allForms[0]));
			this.localForms = this.allForms.slice();
			console.log("localForms.length:"+this.localForms.length);

			//get server list
			this.$http.post('/',{String:'picachu'}).then(function(res){
				console.log('Refreshing File List -------------------');
				this.serverFiles = res.body;
			},
			function(err){
				console.log('fail');
				console.log(err);
			});

			console.log("finished refresh");
		},
		newButtonClicked: function(){
			//open blank form
			this.$emit("event_toggle_form"); //picked up in index.html then app.js newForm()

		},
		editButtonClicked: function(){
			//edit the file this button is listed with
			console.log("Edit button clicked");
		}

	}
})

Vue.component('compFileForm',{
	props: ['file','showFormFlag','form'],
	data: function() {
		return {
			allForms: [],
			index: 0,
			localForm: {
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
				array_adjTo: []
			},
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
	template: `
		<div>
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
					<div class="panel-heading">Second panel-body</div>
					<div class="panel-body">
						Made Of:<br>
							<input class="form-control" v-model="localForm.MadeOf">
							<button class="btn btn-primary" v-on:click="addMadeOf()">Add Made Of</button>
							<div class="list-group">
								<p class="list-group-item" v-for="(item,idx) in localForm.array_madeOf">{{item}}
									<button class="btn btn-secondary btn-sm" v-on:click="deleteElement('madeOf',idx)">Delete</button></p>
							</div>
					</div>
				</div>
				<div class="panel panel-default">
					<div class="panel-heading">Enter Part Of</div>
					<div class="panel-body">
						Part Of:<br>
							<input class="form-control" v-model="localForm.PartOf">
							<button class="btn btn-primary" v-on:click="addPartOf()">Add Part Of</button>
							<div class="list-group">
								<p class="list-group-item" v-for="(item,idx) in localForm.array_partOf">{{item}}
								<button class="btn btn-secondary btn-sm" v-on:click="deleteElement('partOf',idx)">Delete</button></p>
							</div>
					</div>
				</div>
			</div>
			<div class="col-md-3">
				<div class="panel panel-default">
					<div class="panel-heading">Enter things from adjacents</div>
					<div class="panel-body">
						Adjacent From:<br>
							<input class="localForm-control" v-model="localForm.AdjacentFrom">
							<button class="btn btn-primary" v-on:click="addAdjFrom()">Add Adjacent From</button>
							<div class="list-group">
								<p class="list-group-item" v-for="(adj,idx) in localForm.array_adjFrom">{{adj}}
								<button class="btn btn-secondary btn-sm" v-on:click="deleteElement('adjacentFrom',idx)">Delete</button></p>
								</p>
							</div>
					</div>
				</div>
				<div class="panel panel-default">
					<div class="panel-heading">Enter things to adjacents</div>
					<div class="panel-body">
						Adjacent To Name:<br>
							<input class="localForm-control" v-model="localForm.AdjacentTo.name">
						Adjacent To Function:<br>
							<select v-model="localForm.AdjacentTo.function">
								<option v-for="optionAdjacentToFunction in optionsAdjacentToFunction" v-bind:value="optionAdjacentToFunction.text">{{optionAdjacentToFunction.text}}</option>
							</select>
							<button class="btn btn-primary" v-on:click="addAdjTo()">Add Adjacent To</button>
							<div class="list-group">
								<p class="list-group-item" v-for="(adj,idx) in localForm.array_adjTo">{{adj.name}} : {{adj.function}}
								<button class="btn btn-secondary btn-sm" v-on:click="deleteElement('adjacentTo',idx)">Delete</button></p>
								</p>
							</div>
					</div>
				</div>
			</div>
			<button class="btn btn-danger" v-on:click="submitForm(index)">Add Field</button>
		</div>`,
		methods: {
			submitForm: function(index){
				this.allForms[index]=this.localForm;
				var msg = {
					Platform:this.localForm.Platform,
					Subsystem:this.localForm.Subsystem,
					Category:this.localForm.Category,
					FunctionalArea:this.allForms[index].FunctionalArea,
					LayerPhysical:this.allForms[index].LayerPhysical,
					LayerApplication:this.allForms[index].LayerApplication,
					LayerIntegration:this.allForms[index].LayerIntegration,
					MadeOf:JSON.stringify(this.allForms[index].array_madeOf),
					PartOf:JSON.stringify(this.allForms[index].array_partOf),
					AdjacentFrom:JSON.stringify(this.allForms[index].array_adjFrom),
					AdjacentTo:JSON.stringify(this.allForms[index].array_adjTo)
				};

				this.$emit("event_submit_form", JSON.stringify(msg)); //pass msg to app.js
				
				this.localForm = {
					Platform: '',
					Subsystem: '',
					Category: '',
					FunctionalArea: '',
					LayerPhysical: '',
					LayerApplication:'',
					LayerIntegration:'',
					MadeOf:'',
					array_madeOf:[],
					PartOf:'',
					array_partOf:[],
					AdjacentFrom:'',
					array_adjFrom:[],
					AdjacentTo:{name:'',function:''},
					array_adjTo:[]
				};

				this.index = this.allForms.length;
			},

			deleteElement: function(type,index){
				if(index>-1){
					if(confirm('Are you sure you want to delete that?')){
						if (type=='madeOf'){
							this.localForm.array_madeOf.splice(index,1);
						}else if (type=='partOf'){
							this.localForm.array_partOf.splice(index,1);
						}else if (type=='adjacentTo'){
							this.localForm.array_adjTo.splice(index,1);
						} else if (type=='adjacentFrom'){
							this.localForm.array_adjFrom.splice(index,1);
						} else {
							console.log('Error in type of thing to delete');
						}
					}
				}
			},

			addAdjFrom: function(){
				this.localForm.array_adjFrom.push(this.localForm.AdjacentFrom);
				this.localForm.AdjacentFrom='';
			},

			addAdjTo: function(){
				this.localForm.array_adjTo.push({name:this.localForm.AdjacentTo.name, function:this.localForm.AdjacentTo.function});
				this.localForm.AdjacentTo.name = '';
				this.localForm.AdjacentTo.function = '';
			},

			addMadeOf: function(){
				this.localForm.array_madeOf.push(this.localForm.MadeOf);
				this.localForm.MadeOf='';
			},

			addPartOf: function(){
				this.localForm.array_partOf.push(this.localForm.PartOf);
				this.localForm.PartOf='';
			},

		}
})

//app.js

new Vue({
	el: '#form',

	data: {
		allForms: [],
		index: 0,
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

	},

	ready: function(){
		console.log('waiting');
	},

	methods: {
		addAdjFrom: function(){
			this.form.array_adjFrom.push(this.form.AdjacentFrom);
			this.form.AdjacentFrom='';
		},

		addAdjTo: function(){
			this.form.array_adjTo.push({name:this.form.AdjacentTo.name, function:this.form.AdjacentTo.function});
			this.form.AdjacentTo.name = '';
			this.form.AdjacentTo.function = '';
			
		},

		addMadeOf: function(){
			this.form.array_madeOf.push(this.form.MadeOf);
			this.form.MadeOf='';
		},

		addPartOf: function(){
			this.form.array_partOf.push(this.form.PartOf);
			this.form.PartOf='';
		},

		submitForm: function(index){
			this.allForms[index]=this.form;

			var msg = {
				Platform:this.form.Platform,
				Subsystem:this.form.Subsystem,
				Category:this.form.Category,
				FunctionalArea:this.allForms[index].FunctionalArea,
				LayerPhysical:this.allForms[index].LayerPhysical,
				LayerApplication:this.allForms[index].LayerApplication,
				LayerIntegration:this.allForms[index].LayerIntegration,
				MadeOf:JSON.stringify(this.allForms[index].array_madeOf),
				PartOf:JSON.stringify(this.allForms[index].array_partOf),
				AdjacentFrom:JSON.stringify(this.allForms[index].array_adjFrom),
				AdjacentTo:JSON.stringify(this.allForms[index].array_adjTo)
				};

			this.$http.post('/forms', msg);
			this.form = {
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

		editFile: function(index){
			this.form.Platform = this.allForms[index].Platform;
			this.form.Subsystem = this.allForms[index].Subsystem;
			this.form.Category = this.allForms[index].Category;
			this.form.FunctionalArea = this.allForms[index].FunctionalArea;
			this.form.LayerPhysical = this.allForms[index].LayerPhysical;
			this.form.LayerApplication = this.allForms[index].LayerApplication;
			this.form.LayerIntegration = this.allForms[index].LayerIntegration;
			this.form.array_madeOf = this.allForms[index].array_madeOf;
			this.form.array_partOf = this.allForms[index].array_partOf;
			this.form.array_adjFrom = this.allForms[index].array_adjFrom;
			this.form.array_adjTo = this.allForms[index].array_adjTo;
			this.index = index;
		},

		deleteElement: function(type,index){
			if(index>-1){
				if(confirm('Are you sure you want to delete that?')){
					if (type=='madeOf'){
						this.form.array_madeOf.splice(index,1);
					}else if (type=='partOf'){
						this.form.array_partOf.splice(index,1);
					}else if (type=='adjacentTo'){
						this.form.array_adjTo.splice(index,1);
					} else if (type=='adjacentFrom'){
						this.form.array_adjFrom.splice(index,1);
					} else {
						console.log('Error in type of thing to delete');
					}
				}
			}
		}
	}

});
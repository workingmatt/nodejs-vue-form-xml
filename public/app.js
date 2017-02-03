//app.js

new Vue({
	el: '#form',

	data: {
		allForms: [],
		index: 0,
		form: {
			Platform: '', 
			Subsystem: '',
			FunctionalArea:'',
			LayerPhysical:'',
			LayerApplication:'',
			LayerIntegration:'',
			MadeOf:'',
			PartOf:'',
			AdjacentFrom:'',
			AdjacentToName:'',
			AdjacentToFunction:''
		},

		optionsFunctionalArea: [
			{text:''},
			{text:'Sensor Systems'},
			{text:'Stores/Weapons'},
			{text:'ESM & Defensive Aids'},
			{text:'Navigation'},
			{text:'Communications'},
			{text:'Mission Computing'},
			{text:'External Interfaces'},
			{text:'Display/Operator Interfaces'},
			{text:'Mission Support Systems'},
			{text:'Engineering Support Systems'}
		],

		optionsLayerPhysical: [
			{text:'Sub-System Processing'},
			{text:'LANS, Databases & Servers'},
			{text:'Interfaces, User Terminals, Displays & Applications'},
			{text:'External Support Systems'}
		],

		optionsLayerApplication: [
			{text:'Client Application'},
			{text:'Server Application'},
			{text:'External Application'}
		],

		optionsLayerIntegration: [
			{text:'Physical Layer'},
			{text:'Virtualisation Layer'},
			{text:'Operating System Layer'},
			{text:'Application Layer'}
		],

		optionsAdjacentToFunction: [
			{text:'command'},
			{text:'status'},
			{text:'data'},
			{text:'not defined'}
		]

	},

	ready: function(){
		console.log('waiting');
	},

	methods: {
		addForm: function(index){
			this.allForms[index]=this.form;

			var msg = {
				Platform:this.form.Platform,
				Subsystem:this.form.Subsystem,
				FunctionalArea:this.allForms[index].FunctionalArea,
				LayerPhysical:this.allForms[index].LayerPhysical,
				LayerApplication:this.allForms[index].LayerApplication,
				LayerIntegration:this.allForms[index].LayerIntegration,
				MadeOf:this.allForms[index].MadeOf,
				PartOf:this.allForms[index].PartOf,
				AdjacentFrom:this.allForms[index].AdjacentFrom,
				AdjacentToName:this.allForms[index].AdjacentToName,
				AdjacentToFunction:this.allForms[index].AdjacentToFunction
				};

			this.$http.post('/post', msg);
			this.form = {
				Platform: '',
				Subsystem: '',
				FunctionalArea: '',
				LayerPhysical: '',
				LayerApplication:'',
				LayerIntegration:'',
				MadeOf:'',
				PartOf:'',
				AdjacentFrom:'',
				AdjacentToName:'',
				AdjacentToFunction:''
			};
			this.index = this.allForms.length;

			for (i=0;i<index;i++){
				console.log('Index: '+i+
					' Platform: '+this.allForms[i].Platform+
					' Subsystem: '+this.allForms[i].Subsystem+
					' FunctionalArea: '+this.allForms[i].FunctionalArea+
					' LayerPhysical: '+this.allForms[i].LayerPhysical+
					' LayerApplication: '+this.allForms[i].LayerApplication+
					' LayerIntegration: '+this.allForms[i].LayerIntegration+
					' MadeOf: '+this.allForms[i].MadeOf+
					' PartOf: '+this.allForms[i].PartOf+
					' AdjacentFrom: '+this.allForms[i].AdjacentFrom+
					' AdjacentToName: '+this.allForms[i].AdjacentToName+
					' AdjacentToFunction: '+this.allForms[i].AdjacentToFunction
					);
			}
		},

		editForm: function(index){
			this.form.Platform = this.allForms[index].Platform;
			this.form.Subsystem = this.allForms[index].Subsystem;
			this.form.FunctionalArea = this.allForms[index].FunctionalArea;
			this.form.LayerPhysical = this.allForms[index].LayerPhysical;
			this.form.LayerApplication = this.allForms[index].LayerApplication;
			this.form.LayerIntegration = this.allForms[index].LayerIntegration;
			this.form.MadeOf = this.allForms[index].MadeOf
			this.form.PartOf = this.allForms[index].PartOf
			this.form.AdjacentFrom = this.allForms[index].AdjacentFrom
			this.form.AdjacentToName = this.allForms[index].AdjacentToName
			this.form.AdjacentToFunction = this.allForms[index].AdjacentToFunction

			this.index = index;
		},

		deleteForm: function(index){
			if(index>-1){
				if(confirm('Are you sure you want to delete '+this.allForms[index].title)){
					this.allForms.splice(index,1);
					this.index=this.allForms.length;
				}
			}
		}
	}

});
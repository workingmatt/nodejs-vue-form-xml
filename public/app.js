//app.js

new Vue({
	el: '#form',

	data: {
		allForms: [],
		index: 0,
		form: { title: '', value: '', selectedPlatform: 'None', selectedFreq:['None']},
		optionsPlatform: [
			{text:'Choose platform',value:'None'},
			{text:'Type45',value:'Type45'},
			{text:'Warrior',value:'Warrior'},
			{text:'Lynx',value:'Lynx'},
			{text:'Typhoon',value:'Typhoon'}],
		optionsFrequency: [
			{text:'Choose frequency',value:'None'},
			{text:'VHF',value:'VHF'},
			{text:'UHF',value:'UHF'},
			{text:'GHF',value:'GHF'}
		]
	},

	ready: function(){
		console.log('waiting');
	},

	methods: {
		addForm: function(index){
			if(this.form.value){
				this.allForms[index]=this.form;
				for (i=0;i<this.allForms.length;i++){
					console.log('Index: '+i+
						' Title: '+this.allForms[i].title+
						' Value: '+this.allForms[i].value+
						' Platform: '+this.allForms[i].selectedPlatform+
						' Frequency: '+this.allForms[i].selectedFreq);
				}

				var msg = {
					title:this.form.title,
					value:this.form.value,
					selectedPlatform:this.allForms[index].selectedPlatform,
					selectedFreq:this.allForms[index].selectedFreq
					};
				this.$http.post('/post', msg);

				this.form = {title: '', value: '', selectedPlatform: 'None', selectedFreq: []};
				this.index = this.allForms.length;
			}
		},

		editForm: function(index){
			console.log('Edit index: '+index);
			this.form.title = this.allForms[index].title;
			this.form.value = this.allForms[index].value;
			this.form.selectedPlatform = this.allForms[index].selectedPlatform;
			this.form.selectedFreq = this.allForms[index].selectedFreq;
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
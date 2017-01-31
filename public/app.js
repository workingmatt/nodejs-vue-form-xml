//app.js

new Vue({
	el: '#form',

	data: {
		form: { title: '', value: '' },
		formArray: [],
		index: 0
	},

	ready: function(){
		console.log('waiting');
	},

	methods: {
		addForm: function(index){
			if(this.form.value){
				var tempForm = {};
				tempForm.title = this.form.title;
				tempForm.value = this.form.value;
				this.formArray[this.index]=tempForm;

				console.log('Index: '+index+', Title: '+this.formArray[this.index].title+', arrayLen: '+this.formArray.length);
				this.index = this.formArray.length;
			}
		},
		editRow: function(index){
			console.log('Edit index: '+index);
			this.form.title = this.formArray[index].title;
			this.form.value = this.formArray[index].value;
			this.index = index;
		}
	}

});
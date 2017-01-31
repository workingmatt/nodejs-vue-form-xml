//app.js

new Vue({
	el: '#form',

	data: {
		form: { title: '', value: '' },
		allForms: [],
		index: 0
	},

	ready: function(){
		console.log('waiting');
	},

	methods: {
		addForm: function(index){
			if(this.form.value){
				this.allForms[index]=this.form;
				for (i=0;i<this.allForms.length;i++){
					console.log('Index: '+i+' Title: '+this.allForms[i].title+' Value: '+this.allForms[i].value);
				}
				this.form = {title: '', value: ''};
				this.index = this.allForms.length;
				this.$http.post('/post');
			}
		},

		editForm: function(index){
			console.log('Edit index: '+index);
			this.form.title = this.allForms[index].title;
			this.form.value = this.allForms[index].value;
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
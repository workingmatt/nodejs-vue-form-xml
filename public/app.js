//app.js

new Vue({
	el: '#form',

	data: {
		form: { text1: '' },
		forms: []
	},

	ready: function(){
		console.log('waiting');
	},

	methods: {
		addForm: function(){
			if(this.form.text1){
				console.log(this.form.text1);
				this.forms.push(this.form);
				console.log(this.form);
			}
		}
	}

});
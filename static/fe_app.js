var list = new Vue({
	el: '.main',
	data: {
		postit: {
			title: "",
			desc: "",
			date: ""
		},
		postits: []
	},
	ready: function(){
		this.getPostIts();
	},
	methods: {
		deleteNote: function($index) {
			if(confirm("Are you sure?"))
				this.postits.splice($index,1);
				console.log(this.postit._id);
				console.log(this.postit);
				// this.$http.delete('api/notes',this.postit.id);

			// back end delete goes here!
			
		},
		getPostIts: function() {
			// back end import stuff goes here
			this.$http.get("/api/notes", function(data,status,req){
				this.$set('postits', data.postits);
			});
			
		},
		newNote: function () {
			var cur_postit = {
				title: this.postit.title,
				desc: this.postit.desc,
				date: this.postit.date
			};
			this.$http.post('/api/notes',cur_postit)
			.success(function(){
				this.postits.push(cur_postit);
				this.getPostIts();
			}
			);
		}
	}
});

var nav = new Vue({
	el: '.nav',
	methods: {
		streamView: function(){
			document.querySelector('.post-it__list > ul').style.flexDirection = "column";
			console.log("tesr");
		},
		gridView: function(){
			document.querySelector('.post-it__list > ul').style.flexDirection = "row";
		}
	}
});
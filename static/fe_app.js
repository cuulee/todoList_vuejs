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
			if(confirm("Are you sure?")) {
				console.log(this.postits[$index]._id);
				this.$http.delete('/api/notes',{id: this.postits[$index]._id})
					.success(function(){
						this.postits.splice($index,1);
					});
				}
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
				this.getPostIts();
				this.postits.push(cur_postit);
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
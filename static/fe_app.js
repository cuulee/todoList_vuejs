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
			if(confirm("Are you sure?" + $index)) {
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
		getPostitsDelay: function(){
			this.$http.get("/api/notes", function(data,status,req){
				var newthis = this;
				console.log(newthis);
				setTimeout(function(){
					newthis.$set('postits', data.postits);
				}, 1);
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
		},
		showDesc: function (event) {
			var descdiv = event.target.parentNode.parentNode;
			var truncated = descdiv.childNodes[0];
			var full = descdiv.childNodes[1];
		},
		showDelete: function (event) {
			var par = event.target.childNodes[1];
			var icon = event.target.childNodes[1].childNodes[1];
			icon.setAttribute("data-default-icon", icon.textContent);
			icon.textContent = "delete";
			icon.style.cursor = "pointer";
			par.style.cursor = "pointer";
		},
		hideDelete: function (event) {
			var icon = event.target.childNodes[1].childNodes[1];
			icon.textContent = icon.getAttribute("data-default-icon");
		},
		checkDel: function(event,index) {
			elem = event.target;
			
			if (elem.childNodes.length > 1)				
				elem = elem.childNodes[1];

			if (elem.textContent == "delete")
				this.deleteNote(index);
		},
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

// vue custom filters

Vue.filter('truncate', function(value, length) {
	if(value.length < length)
		return value;

	length = length - 3;
	return value.substring(0, length) + '…';
});

Vue.filter('truncate_words', function(value,length){
	if (value.length < length)
		return value;

	var value_to_length = value.substr(0, length);
	return value_to_length.substr(0, Math.min(value_to_length.length, value_to_length.lastIndexOf(" "))) + "…";
});
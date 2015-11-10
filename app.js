var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require("fs");
var mongoose   = require('mongoose');
var fs = require("fs");

mongoose.connect('mongodb://postit:1@ds045684.mongolab.com:45684/todo_list');

var Postit = mongoose.model('postit', 
{	
	title: "",
	desc: "",
	date: ""
}
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// declare the port
var port = 3000; 

var router = express.Router();



router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});


// /notes post or get
router.route('/notes')

.get(function(req,res){
	Postit.find(function(err,postits){
		if (err)
			console.log(err);
		console.log(postits);
		res.json({"postits": postits});
	});
})

.post(function(req,res){
	console.log(req.body);
	console.log(req);
	var note = new Postit({
		"title": req.body.title,
		"desc": req.body.desc,
		"date": req.body.date,
	});
	note.save(function (err) {
		if (err)
			console.log(':-(');
	});
	res.json({ message: 'note created!' });
})
;

app.use('/api', router);
app.use(express.static('static'));

app.listen(port);
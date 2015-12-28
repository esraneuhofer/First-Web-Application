var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var db = require('./db.js');
var path = require('path');

var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.static('../public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


app.post('/api/add',function(req, res){

	db.gerichte.create(req.body).then(function(addedMeal){
		res.json(addedMeal);
	},function(e){
		res.json(e);
	});
});


// app.get('/api/get/:id',function(req,res){

// 	db.gerichte.findById(req.params.id).then(function(foundMeal){
// 			res.json(foundMeal);
// 	},function(e){
// 		res.json(e);
// 	});

// });

// function buildDbQuery(reqQuery) {
// 	if(!!reqQuery) {
// 			if(!!reqQuery.fleisch) {
// 		var fleischFilter = {
// 			fleisch:{
// 				$in:fleisch
// 			}	
// 		};
// 	}
	
// 	if(!!reqQuery.beilagen) {
// 		var beilagenFilter = {
// 			beilage:{
// 				$in:beilagen
// 			}	
// 		}
// 	}

// 	if(!!fleischFilter && !!beilagenFilter) {
// 		return { $or: [fleischFilter, beilagenFilter]}
// 	} else if (!!fleischFilter) { 
// 		return fleischFilter;
// 	} else if (!!beilagenFilter) {
// 		return beilagenFilter;
// 	}
// 	}

// 	return {};
// }

// app.get('/api/get/meals',function(req, res){
// 	db.gerichte.findAll({where:buildDbQuery(req.dbQuery)}).then(function(foundMeals){
// 		res.json(foundMeals);
// 	},function(e){
// 		//res.json(e);

// 		res.json(buildDbQuery(req.dbQuery));
// 	});
// });

app.get('/api/get/meals',function(req, res){
	db.gerichte.findAll().then(function(foundMeals){
		res.json(foundMeals);
	},function(e){
		res.json(e);
	});
});

app.get('/add',function(req, res){
	res.sendFile(path.join(__dirname + '/../public/html/addmeals.html'));
});
app.use('/',function(req, res ){
	res.sendFile('index.html',{root:'../public/html'});
});


db.sequelize.sync().then(function() {
	app.listen(PORT, function() {
		console.log('Express listening on port ' + PORT + '!');
	});
});
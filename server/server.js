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

app.get('/api/get/findByName/',function(req,res){

	var searchName =req.query;
	db.gerichte.findOne({where:{name:searchName.name}}).then(function(foundMeal){
		res.json(foundMeal);
	},function(e){
		res.json(e);
	});
});

app.get('/api/get/changeCW/',function(req,res){

	var searchNameMonday =req.query.nameMontag;
	var searchNameThuesday=req.query.nameDienstag;
	var searchNameWednesday =req.query.nameMittwoch;
	var searchNameThursday = req.query.nameDonnerstag;
	var searchNameFriday =req.query.nameFreitag;
	var usedInCalanderWeek = req.query.kalenderwoche;
	var changedAttribute={};
	changedAttribute.kalenderwoche = usedInCalanderWeek;

	db.gerichte.findOne({where:{name:searchNameThuesday}}).then(function(foundMeal){
		foundMeal.update(changedAttribute).then(function(changeCalenderWeekMeal){
			res.json(changeCalenderWeekMeal);
		})
	},function(e){
		res.json(e);
	});

	db.gerichte.findOne({where:{name:searchNameMonday}}).then(function(foundMeal){
		foundMeal.update(changedAttribute).then(function(changeCalenderWeekMeal){
			res.json(changeCalenderWeekMeal);
		})
	},function(e){
		res.json(e);
	});
	db.gerichte.findOne({where:{name:searchNameWednesday}}).then(function(foundMeal){
		foundMeal.update(changedAttribute).then(function(changeCalenderWeekMeal){
			res.json(changeCalenderWeekMeal);
		})
	},function(e){
		res.json(e);
	});
	db.gerichte.findOne({where:{name:searchNameThursday}}).then(function(foundMeal){
		foundMeal.update(changedAttribute).then(function(changeCalenderWeekMeal){
			res.json(changeCalenderWeekMeal);
		})
	},function(e){
		res.json(e);
	});
	db.gerichte.findOne({where:{name:searchNameFriday}}).then(function(foundMeal){
		foundMeal.update(changedAttribute).then(function(changeCalenderWeekMeal){
			res.json(changeCalenderWeekMeal);
		})
	},function(e){
		res.json(e);
	});
});

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

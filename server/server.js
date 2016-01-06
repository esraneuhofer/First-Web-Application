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

app.get('/api/changeMeal',function(req, res){
	var meal = req.query.search;
	var type = req.query.art;
	var name = req.query.name;
	var garnish=req.query.beilage;
	var secondGarnish =req.query.zweiteBeilage;
	var meat = req.query.fleisch;
	var componant = req.query.komponenten;
	var price = req.query.preis;
	var calenderWeek = req.query.kalenderwoche; 
	var changedAttributes={};
	if(type){
		changedAttributes.art = type;
	}
	if(name){
		changedAttributes.name = name;
	}
	if(garnish){
		changedAttributes.beilage = garnish;
	}
	if(secondGarnish){
		changedAttributes.zweiteKomponente = secondGarnish;
	}
	if(meat){
		changedAttributes.fleisch = meat;
	}
	if(componant){
		changedAttributes.komponenten = componant;
	}
	if(price){
		changedAttributes.preis = price;
	}
	if(calenderWeek){
		changedAttributes.kalenderwoche = calenderWeek;
	}

	db.gerichte.findOne({where:{name:meal}}).then(function(foundMeal){
		foundMeal.update(changedAttributes).then(function(changeMeal){
			res.json(changeMeal);
		})
		res.json(foundMeal);
	},function(e){
		res.json(e);
	});
});

app.get('/api/getType',function(req, res){
	var type = req.query.type;

	db.gerichte.findAll({where:{art:type}}).then(function(foundMeals){
		res.json(foundMeals);
	},function(e){
		res.json(e);
	});
});

app.get('/api/getForChange',function(req, res){
	var searchMealForChange = req.query.name;

	db.gerichte.findOne({where:{name:searchMealForChange}}).then(function(foundMeal){
		console.log(foundMeal);
		res.json(foundMeal);
	},function(e){
		res.json(e);
	});
});

app.get('/api/getCalender',function(req, res){
	var calenderWeek = req.query.week;
	var mealsFromCw = calenderWeek -5 ;
	console.log(calenderWeek);
	if(!calenderWeek){
		db.gerichte.findAll().then(function(allMeals){
			res.json(allMeals);
		},function(e){

		})
	}else{
		db.gerichte.findAll({
		where:{
			kalenderwoche:{
				$lt:mealsFromCw
			}
		}
		}).then(function(foundMeals){
			res.json(foundMeals);	
			console.log(foundMeals);
		},function(e){
			res.json(e);
		});
	}	
});

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

app.get('/prevmenu',function(req, res){
	res.sendFile(path.join(__dirname + '/../public/html/createPlan.html'));
});

app.get('/change',function(req, res){
	res.sendFile(path.join(__dirname + '/../public/html/changeMeal.html'));
});

app.get('/all',function(req, res){
	res.sendFile(path.join(__dirname + '/../public/html/allMeals.html'));
});

pp.get('/',function(req, res){
	res.sendFile(path.join(__dirname + '/../public/html/index.html'));
});
// app.use('/',function(req, res ){
// 	res.sendFile('index.html',{root:'../public/html'});
// });

db.sequelize.sync().then(function() {
	app.listen(PORT, function() {
		console.log('Express listening on port ' + PORT + '!');
	});
});




module.exports = function(sequelize, DataTypes){
	var user = sequelize.define('gerichte',{
		art:{
			type:DataTypes.STRING,
			allowNull:false
		},
		name:{
			type:DataTypes.STRING,
			allowNull:false,
			unique : true
		},
		fleisch:{
			type:DataTypes.STRING,
			allowNull:false
		},
		beilage:{
			type:DataTypes.STRING,
			allowNull:true
		},
		komponenten:{
			type:DataTypes.STRING,
			allowNull:true
		},
		zweiteKomponente:{
			type:DataTypes.STRING,
			allowNull:true
		},
		preis:{
			type:DataTypes.DECIMAL
		},
		kalenderwoche:{
			type:DataTypes.DECIMAL
		}
	});
	return user;
};
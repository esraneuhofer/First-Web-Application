module.exports = function(sequelize, DataTypes){
	return sequelize.define('gerichte',{
		art:{
			type:DataTypes.STRING,
			allowNull:false
		},
		name:{
			type:DataTypes.STRING,
			allowNull:false,
			unique : true
		},
		beilage:{
			type:DataTypes.STRING,
			allowNull:true
		},
		zweiteKomponente:{
			type:DataTypes.STRING,
			allowNull:true
		},
		fleisch:{
			type:DataTypes.STRING,
			allowNull:false
		},
		komponenten:{
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
};
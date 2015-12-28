// alert(JSON.stringify(Object, null, 4));
function addMeal(){
	$.ajax({
		url:'/api/add',
		data:createMeal(),
		type:'POST',
		success:function(addedMeal){
			alert("workes ");
		},
		error:function(e){
			alert("error");
		}
	});
}

function createMeal(){

	var type=$("#art").val();
	var meal = $("#gericht").val();
	var meat= $("#fleisch").val();
	var side= $("#beilage").val();
	var componant= $("#komponenten").val();
	var secondComponant=$("#zweiteBeilage").val();
	var price= $('#preis').val();
	var kw =$('#kalaenderwoce').val();

	function Meal (art,gericht,fleisch,beilage,komponenten,zweiteKomponente,preis,kalernderwoche){

		this.art=art;
		this.name=gericht;
		this.fleisch=fleisch;
		this.beilage=beilage;
		this.komponenten=komponenten;
		this.zweiteKomponente=zweiteKomponente;
		this.preis=preis;
		this.kalernderwoche=kalernderwoche;
	}

	var meal = new Meal (type,meal,meat,side,componant,secondComponant,price,kw);
	return meal;
}
function changeSelection(){
	$.ajax({
		type:'GET',
		url:'api/get/meals',
		success:buildTable

	});

}

function buildTable(foundMeals){
	var fleischSelect = [];
	var selectionMeat={};
	var selectionGarnish={};
	var beilagen = [];

	
	if($('#fish').is(":checked")){
		fleischSelect.push("Fisch");
		selectionMeat.fleisch = "Fisch";	
	}
	if($('#beef').is(":checked")){
		fleischSelect.push("Rind");
		selectionMeat.fleisch = "Rind";
	}
	if($('#chicken').is(":checked")){
		fleischSelect.push("Pute");
		selectionMeat.fleisch = "Pute";
	}
	if($('#vegetarian').is(":checked")){
		fleischSelect.push("Vegetarisch");
		selectionMeat.fleisch = "Vegetarisch";
	}

	if($('#potato').is(":checked")){
		fleischSelect.push("Kartoffel");	
		selectionGarnish.beilage = "Kartoffel";	
	}
	if($('#rice').is(":checked")){
		fleischSelect.push("Reis");
		selectionGarnish.beilage = "Reis";
	}
	if($('#pasta').is(":checked")){
		fleischSelect.push("Nudel");
		selectionGarnish.beilage = "Nudel";
	}
	alert(beilagen.length);
	$('#myTableBody').empty();
	$.each(foundMeals, function (i, gericht){
		var seen =[];
		seen.push(gericht);
		$('tr').each(function() {
		    var txt = $(this).text();
		    if (seen[txt])
		        $(this).remove();
		    else
		        seen[txt] = true;
		});

		fleischSelect.map(function(eachWord){
			// if(beilagen.length = 0){
				if(gericht.fleisch === eachWord || gericht.beilage === eachWord){
				$('#myTableBody').append('<tr>'+
				'<td>'+gericht.art+'</td>'+
				'<td>'+gericht.name+'</td>'+
				'<td>'+gericht.beilage+'</td>'+
				'<td>'+gericht.zweiteKomponente+'</td>'+
				'<td>'+gericht.fleisch+'</td>'+
				'<td>'+gericht.komponenten+'</td>'+
				'<td>'+gericht.preis+'</td>'+'</tr>');
				
			// }

			}
			
		});	
	});
}

$( "#beef" ).change(function() {
	changeSelection();
});
$( "#chicken" ).change(function() {
	changeSelection();
});
$( "#vegetarian" ).change(function() {
	changeSelection();
});
$( "#fish" ).change(function() {
	changeSelection();
});
$( "#potato" ).change(function() {
	changeSelection();
});
$( "#rice" ).change(function() {
	changeSelection();
});
$( "#pasta" ).change(function() {
	changeSelection();
});













// function checkBoxClicked() {
// 	var fleischSelect = [];
// 	var beilagen = [];

// 	if($('#fish').is(":checked")){
// 		fleischSelect.push("Fisch");	
// 	}
// 	if($('#beef').is(":checked")){
// 		fleischSelect.push("Rind");
// 	}
// 	if($('#chicken').is(":checked")){
// 		fleischSelect.push("Pute");
// 	}
// 	if($('#vegetarian').is(":checked")){
// 		fleischSelect.push("Vegetarisch");
// 	}

// 	if($('#potato').is(":checked")){
// 		beilagen.push("Kartoffel");	
// 	}
// 	if($('#rice').is(":checked")){
// 		beilagen.push("Reis");
// 	}
// 	if($('#pasta').is(":checked")){
// 		beilagen.push("Nudel");
// 	}

// 	changeSelection(fleischSelect, beilagen);
// }



// $( "#firstChoice" ).change(function() {
// 	var chosenMeal =$( "#firstChoice" ).val();
// 	if (chosenMeal === "allMeals"){
// 		$.ajax({
// 			type:'GET',
// 			url:'api/get/meals',
// 			success:buildTable
// 		});

// 	}else if(chosenMeal === "mainSoup"){
		 
// 		$.ajax({
// 			type:'GET',
// 			url:'api/get/meals',
// 			success:function(foundMeals){
// 				$('#myTableBody').empty();
// 				$.each(foundMeals, function (i, gericht){
// 					if(gericht.art === "Suppe"){
// 					$('#myTableBody').append('<tr>'+
// 						'<td>'+gericht.art+'</td>'+
// 						'<td>'+gericht.name+'</td>'+
// 						'<td>'+gericht.beilage+'</td>'+
// 						'<td>'+gericht.zweiteKomponente+'</td>'+
// 						'<td>'+gericht.fleisch+'</td>'+
// 						'<td>'+gericht.komponenten+'</td>'+
// 						'<td>'+gericht.preis+'</td>'+'</tr>');
// 					}
// 				});
// 			}
// 		});

// 	}else if(chosenMeal=== "mainMeal"){
		
// 		$.ajax({
// 			type:'GET',
// 			url:'api/get/meals',
// 			success:function(foundMeals){
// 				$('#myTableBody').empty();
// 				$.each(foundMeals, function (i, gericht){
// 					if(gericht.art === "Hauptgericht"){
// 					$('#myTableBody').append('<tr>'+
// 						'<td>'+gericht.art+'</td>'+
// 						'<td>'+gericht.name+'</td>'+
// 						'<td>'+gericht.beilage+'</td>'+
// 						'<td>'+gericht.zweiteKomponente+'</td>'+
// 						'<td>'+gericht.fleisch+'</td>'+
// 						'<td>'+gericht.komponenten+'</td>'+
// 						'<td>'+gericht.preis+'</td>'+'</tr>');
// 					}
// 				});
// 			}
// 		});
// 	}  
// });
// String.prototype.isMatch = function(s){
//    return this.match(s)!==null 
// }
// $('#getSelected').click(function(){
// 	changeSelection();
// });

	// var generalSelect=$("#firstChoice").val();
	// var selectionMeat={};
	// var selectionGarnish={}; 
	// var selectionSoup;

	// if($('#fish').is(":checked")){
	// 	selectionMeat.fleisch = "Fisch";	
	// }else if($('#beef').is(":checked")){
	// 	selectionMeat.fleisch = "Rind";
	// }else if($('#chicken').is(":checked")){
	// 	selectionMeat.fleisch = "Pute";
	// }else if($('#vegetarian').is(":checked")){
	// 	selectionMeat.fleisch = "Vegetarisch";
	// }else{selectionGarnish.fleisch = 1}

	// if($('#potato').is(":checked")){
	// 	selectionGarnish.beilage = "Kartoffel";	
	// }else if($('#rice').is(":checked")){
	// 	selectionGarnish.beilage = "Reis";
	// }else if($('#pasta').is(":checked")){
	// 	selectionGarnish.beilage = "Nudel";
	// }else{selectionGarnish.beilage = 1}

	// $.ajax({
	// 	type:'GET',
	// 	url:'api/get/meals',
	// 	success:function(foundMeals){
	// 		$('#myTableBody').empty();
	// 		$.each(foundMeals, function (i, gericht){
	// 			if(selectionMeat.fleisch === gericht.fleisch && selectionGarnish.beilage === gericht.beilage){
	// 				$('#myTableBody').append('<tr>'+
	// 						'<td>'+gericht.art+'</td>'+
	// 						'<td>'+gericht.name+'</td>'+
	// 						'<td>'+gericht.beilage+'</td>'+
	// 						'<td>'+gericht.zweiteKomponente+'</td>'+
	// 						'<td>'+gericht.fleisch+'</td>'+
	// 						'<td>'+gericht.komponenten+'</td>'+
	// 						'<td>'+gericht.preis+'</td>'+'</tr>');
	// 			}
	// 			else if(!selectionMeat.fleisch && selectionGarnish.beilage === gericht.beilage){
	// 				$('#myTableBody').append('<tr>'+
	// 						'<td>'+gericht.art+'</td>'+
	// 						'<td>'+gericht.name+'</td>'+
	// 						'<td>'+gericht.beilage+'</td>'+
	// 						'<td>'+gericht.zweiteKomponente+'</td>'+
	// 						'<td>'+gericht.fleisch+'</td>'+
	// 						'<td>'+gericht.komponenten+'</td>'+
	// 						'<td>'+gericht.preis+'</td>'+'</tr>');
	// 			}
	// 			else if(!selectionGarnish && selectionMeat === gericht.fleisch){
	// 					$('#myTableBody').append('<tr>'+
	// 						'<td>'+gericht.art+'</td>'+
	// 						'<td>'+gericht.name+'</td>'+
	// 						'<td>'+gericht.beilage+'</td>'+
	// 						'<td>'+gericht.zweiteKomponente+'</td>'+
	// 						'<td>'+gericht.fleisch+'</td>'+
	// 						'<td>'+gericht.komponenten+'</td>'+
	// 						'<td>'+gericht.preis+'</td>'+'</tr>');
	// 			}
	// 		});
	// 	}
	// });








// $("#beef1").on("click", function(){
//         var id = parseInt($(this).val(), 10);
//         if($(this).is(":checked")) {
//             $.ajax({
// 				type:'GET',
// 				url:'api/get/meals',
// 				success:function(foundMeals){
// 					$('#myTableBody').empty();
// 					$.each(foundMeals, function (i, gericht){
// 						if(gericht.fleisch === "Rind"){
// 						$('#myTableBody').append('<tr>'+
// 							'<td>'+gericht.name+'</td>'+
// 							'<td>'+gericht.beilage+'</td>'+
// 							'<td>'+gericht.zweiteKomponente+'</td>'+
// 							'<td>'+gericht.fleisch+'</td>'+
// 							'<td>'+gericht.komponenten+'</td>'+
// 							'<td>'+gericht.preis+'</td>'+'</tr>');
// 						}
// 					});
// 				}
// 			});
//         } else {
//             $('#myTableBody').empty();
//         }
// });
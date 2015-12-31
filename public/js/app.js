function addMeal(){
	$.ajax({
		url:'/api/add',
		data:createMeal(),
		type:'POST',
		success:function(addedMeal){
			alert("Meal added to Database");
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
	var kw =$('#kalenderwoche').val();

	function Meal (art,gericht,fleisch,beilage,komponenten,zweiteKomponente,preis,kalenderwoche){

		this.art=art;
		this.name=gericht;
		this.fleisch=fleisch;
		this.beilage=beilage;
		this.komponenten=komponenten;
		this.zweiteKomponente=zweiteKomponente;
		this.preis=preis;
		this.kalenderwoche=kalenderwoche;
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

function sortOutDouble (){
	var seen =[];
		seen.push(gericht);
		$('tr').each(function() {
		    var txt = $(this).text();
		    if (seen[txt])
		        $(this).remove();
		    else
		        seen[txt] = true;
		});
}

function buildTable(foundMeals){
	
	var fleischSelect = [];
	var selectionMeat={};
	var selectionGarnish={};
	var beilagen = [];
	var selectAll=[];
	
	if($('#fish').is(":checked")){
		fleischSelect.push("Fisch");
		selectionMeat.fleisch = "Fisch";
		selectAll.push("Fisch");	
	}
	if($('#beef').is(":checked")){
		fleischSelect.push("Rind");
		selectionMeat.fleisch = "Rind";
		selectAll.push("Rind");
	}
	if($('#chicken').is(":checked")){
		fleischSelect.push("Pute");
		selectionMeat.fleisch = "Pute";
		selectAll.push("Pute");
	}
	if($('#vegetarian').is(":checked")){
		fleischSelect.push("Vegetarisch");
		selectionMeat.fleisch = "Vegetarisch";
		selectAll.push("Vegetarisch");
	}

	if($('#potato').is(":checked")){
		beilagen.push("Kartoffel");	
		selectionGarnish.beilage = "Kartoffel";
		selectAll.push("Kartoffel");	
	}
	if($('#rice').is(":checked")){
		beilagen.push("Reis");
		selectionGarnish.beilage = "Reis";
		selectAll.push("Reis");
	}
	if($('#pasta').is(":checked")){
		beilagen.push("Nudel");
		selectionGarnish.beilage = "Nudel";
		selectAll.push("Nudel");
	}
	
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

				if(beilagen.length === 0){

					if(gericht.fleisch === eachWord){

					$('#myTableBody').append('<tr>'+
					'<td>'+gericht.art+'</td>'+
					'<td>'+gericht.name+'</td>'+
					'<td>'+gericht.beilage+'</td>'+
					'<td>'+gericht.zweiteKomponente+'</td>'+
					'<td>'+gericht.fleisch+'</td>'+
					'<td>'+gericht.komponenten+'</td>'+
					'<td>'+gericht.kalenderwoche+'</td>'+
					'<td>'+gericht.preis+'</td>'+'</tr>');	
					}		
				}
			});	


			beilagen.map(function(eachWord){

				if(fleischSelect.length === 0){

					if(gericht.beilage === eachWord){

					$('#myTableBody').append('<tr>'+
					'<td>'+gericht.art+'</td>'+
					'<td>'+gericht.name+'</td>'+
					'<td>'+gericht.beilage+'</td>'+
					'<td>'+gericht.zweiteKomponente+'</td>'+
					'<td>'+gericht.fleisch+'</td>'+
					'<td>'+gericht.komponenten+'</td>'+
					'<td>'+gericht.kalenderwoche+'</td>'+
					'<td>'+gericht.preis+'</td>'+'</tr>');	
					}	
				}	
			});	
			
			selectAll.map(function(eachWord){
					
				if($('#radioOne').is(':checked')){
					if(selectionMeat.fleisch === gericht.fleisch && selectionGarnish.beilage === gericht.beilage){
						$('#myTableBody').append('<tr>'+
						'<td>'+gericht.art+'</td>'+
						'<td>'+gericht.name+'</td>'+
						'<td>'+gericht.beilage+'</td>'+
						'<td>'+gericht.zweiteKomponente+'</td>'+
						'<td>'+gericht.fleisch+'</td>'+
						'<td>'+gericht.komponenten+'</td>'+
						'<td>'+gericht.kalenderwoche+'</td>'+
						'<td>'+gericht.preis+'</td>'+'</tr>');	
					}

				}else{
					if(gericht.fleisch === eachWord || gericht.beilage === eachWord){
						$('#myTableBody').append('<tr>'+
						'<td>'+gericht.art+'</td>'+
						'<td>'+gericht.name+'</td>'+
						'<td>'+gericht.beilage+'</td>'+
						'<td>'+gericht.zweiteKomponente+'</td>'+
						'<td>'+gericht.fleisch+'</td>'+
						'<td>'+gericht.komponenten+'</td>'+
						'<td>'+gericht.kalenderwoche+'</td>'+
						'<td>'+gericht.preis+'</td>'+'</tr>');
						}	
				}
		});				
	});	
}

function tablesorter(){
	$(document).ready(function(){
	$("#myTable").tablesorter( {sortList: [[0,0], [1,0]]} ); 
	});
}
$( "#firstChoice" ).change(function() {
	var chosenMeal =$( "#firstChoice" ).val();
	if (chosenMeal === "allMeals"){
		$.ajax({
			type:'GET',
			url:'api/get/meals',
			success:function(foundMeals){
					$('#myTableBody').empty();
					$.each(foundMeals, function (i, gericht){
						$('#myTableBody').append('<tr>'+
							'<td>'+gericht.art+'</td>'+
							'<td>'+gericht.name+'</td>'+
							'<td>'+gericht.beilage+'</td>'+
							'<td>'+gericht.zweiteKomponente+'</td>'+
							'<td>'+gericht.fleisch+'</td>'+
							'<td>'+gericht.komponenten+'</td>'+
							'<td>'+gericht.kalenderwoche+'</td>'+
							'<td>'+gericht.preis+'</td>'+'</tr>');
						
					});
				}
		});

	}else if(chosenMeal === "mainSoup"){
		 
		$.ajax({
			type:'GET',
			url:'api/get/meals',
			success:function(foundMeals){
				$('#myTableBody').empty();
				$.each(foundMeals, function (i, gericht){
					if(gericht.art === "Suppe"){
					$('#myTableBody').append('<tr>'+
						'<td>'+gericht.art+'</td>'+
						'<td>'+gericht.name+'</td>'+
						'<td>'+gericht.beilage+'</td>'+
						'<td>'+gericht.zweiteKomponente+'</td>'+
						'<td>'+gericht.fleisch+'</td>'+
						'<td>'+gericht.komponenten+'</td>'+
						'<td>'+gericht.kalenderwoche+'</td>'+
						'<td>'+gericht.preis+'</td>'+'</tr>');
					}
				});
			}
		});

	}else if(chosenMeal=== "mainMeal"){
		
		$.ajax({
			type:'GET',
			url:'api/get/meals',
			success:function(foundMeals){
				$('#myTableBody').empty();
				$.each(foundMeals, function (i, gericht){
					if(gericht.art === "Hauptgericht"){
					$('#myTableBody').append('<tr>'+
						'<td>'+gericht.art+'</td>'+
						'<td>'+gericht.name+'</td>'+
						'<td>'+gericht.beilage+'</td>'+
						'<td>'+gericht.zweiteKomponente+'</td>'+
						'<td>'+gericht.fleisch+'</td>'+
						'<td>'+gericht.komponenten+'</td>'+
						'<td>'+gericht.kalenderwoche+'</td>'+
						'<td>'+gericht.preis+'</td>'+'</tr>');
					}
				});
			}
		});
	} else if(chosenMeal=== "salad"){
		
		$.ajax({
			type:'GET',
			url:'api/get/meals',
			success:function(foundMeals){
				$('#myTableBody').empty();
				$.each(foundMeals, function (i, gericht){
					if(gericht.art === "Salat"){
					$('#myTableBody').append('<tr>'+
						'<td>'+gericht.art+'</td>'+
						'<td>'+gericht.name+'</td>'+
						'<td>'+gericht.beilage+'</td>'+
						'<td>'+gericht.zweiteKomponente+'</td>'+
						'<td>'+gericht.fleisch+'</td>'+
						'<td>'+gericht.komponenten+'</td>'+
						'<td>'+gericht.kalenderwoche+'</td>'+
						'<td>'+gericht.preis+'</td>'+'</tr>');
					}
				});
			}
		});
	}  else if(chosenMeal=== "dessert"){
		
		$.ajax({
			type:'GET',
			url:'api/get/meals',
			success:function(foundMeals){
				$('#myTableBody').empty();
				$.each(foundMeals, function (i, gericht){
					if(gericht.art === "Dessert"){
					$('#myTableBody').append('<tr>'+
						'<td>'+gericht.art+'</td>'+
						'<td>'+gericht.name+'</td>'+
						'<td>'+gericht.beilage+'</td>'+
						'<td>'+gericht.zweiteKomponente+'</td>'+
						'<td>'+gericht.fleisch+'</td>'+
						'<td>'+gericht.komponenten+'</td>'+
						'<td>'+gericht.kalenderwoche+'</td>'+
						'<td>'+gericht.preis+'</td>'+'</tr>');
					}
				});
			}
		});
	} else if (chosenMeal==="autoSelect"){
		$('#myTableBody').empty();
	}  
});

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

function getMealByNameAndAdd (){
	var nameInput = $('#nameOfMeal').val();
	

	$.ajax({
		type:'GET',
		data:{
			name:nameInput
		},
		url:'/api/get/findByName',
		success:function(gericht){
			alert('Halo');
			
			var selectedDay = $("#dayChoice").val();
					if(selectedDay === 'chooseDay'){
						alert('Please Select Day Frau Dr. Prisco');
					}
					if(selectedDay ==='monday'){
						if(gericht.beilage.length === 0 && gericht.zweiteKomponente.length === 0 ){
							$('#tableMonday').empty();
							$('#tableMonday').append(gericht.name);	
							$('#tableMondayHide').append(gericht.name);
						}else if(gericht.beilage.length > 0 && gericht.zweiteKomponente.length === 0){
							$('#tableMonday').empty();
							$('#tableMonday').append(gericht.name+" mit "+gericht.beilage);	
							$('#tableMondayHide').append(gericht.name);
						}else if(gericht.beilage.length > 0 && gericht.zweiteKomponente.length > 0){
							$('#tableMonday').empty();
							$('#tableMonday').append(gericht.name+" mit "+gericht.beilage+ " und " +gericht.zweiteKomponente);	
							$('#tableMondayHide').append(gericht.name);

						}		
					}
					if(selectedDay ==='thuesday'){
						if(gericht.beilage.length === 0 && gericht.zweiteKomponente.length === 0 ){
							$('#tableThuesday').empty();
							$('#tableThuesday').append(gericht.name);
							$('#tableThuesdayHide').append(gericht.name);		
						}else if(gericht.beilage.length > 0 && gericht.zweiteKomponente.length === 0){
							$('#tableThuesday').empty();
							$('#tableThuesday').append(gericht.name+" mit "+gericht.beilage);	
							$('#tableThuesdayHide').append(gericht.name);	
						}else if(gericht.beilage.length > 0 && gericht.zweiteKomponente.length > 0){
							$('#tableThuesday').empty();
							$('#tableThuesday').append(gericht.name+" mit "+gericht.beilage+ " und " +gericht.zweiteKomponente);	
							$('#tableThuesdayHide').append(gericht.name);	
						}		
					}
					if(selectedDay ==='wednesday'){
						if(gericht.beilage.length === 0 && gericht.zweiteKomponente.length === 0 ){
							$('#tableWednesday').empty();
							$('#tableWednesday').append(gericht.name);	
							$('#tableWednesdayHide').append(gericht.name);	
						}else if(gericht.beilage.length > 0 && gericht.zweiteKomponente.length === 0){
							$('#tableWednesday').empty();
							$('#tableWednesday').append(gericht.name+" mit "+gericht.beilage);	
							$('#tableWednesdayHide').append(gericht.name);	
						}else if(gericht.beilage.length > 0 && gericht.zweiteKomponente.length > 0){
							$('#tableWednesday').empty();
							$('#tableWednesday').append(gericht.name+" mit "+gericht.beilage+ " und " +gericht.zweiteKomponente);	
							$('#tableWednesdayHide').append(gericht.name);	
						}		
					}
					if(selectedDay ==='thursday'){
						if(gericht.beilage.length === 0 && gericht.zweiteKomponente.length === 0 ){
							$('#tableThursday').empty();
							$('#tableThursday').append(gericht.name);	
							$('#tableThursdayHide').append(gericht.name);
						}else if(gericht.beilage.length > 0 && gericht.zweiteKomponente.length === 0){
							$('#tableThursday').empty();
							$('#tableThursday').append(gericht.name+" mit "+gericht.beilage);	
							$('#tableThursdayHide').append(gericht.name);
						}else if(gericht.beilage.length > 0 && gericht.zweiteKomponente.length > 0){
							$('#tableThursday').empty();
							$('#tableThursday').append(gericht.name+" mit "+gericht.beilage+ " und " +gericht.zweiteKomponente);	
							$('#tableThursdayHide').append(gericht.name);
						}		
					}
					if(selectedDay ==='friday'){
						if(gericht.beilage.length === 0 && gericht.zweiteKomponente.length === 0 ){
							$('#tableFriday').empty();
							$('#tableFriday').append(gericht.name);	
							$('#tableFridayHide').append(gericht.name);	
						}else if(gericht.beilage.length > 0 && gericht.zweiteKomponente.length === 0){
							$('#tableFriday').empty();
							$('#tableFriday').append(gericht.name+" mit "+gericht.beilage);	
							$('#tableFridayHide').append(gericht.name);	
						}else if(gericht.beilage.length > 0 && gericht.zweiteKomponente.length > 0){
							$('#tableFriday').empty();
							$('#tableFriday').append(gericht.name+" mit "+gericht.beilage+ " und " +gericht.zweiteKomponente);	
							$('#tableFridayHide').append(gericht.name);	
						}		
					}
			}
	});
}

$('#getInputMeal').click(function(){
	getMealByNameAndAdd();
});

function changeCalenderWeekMenu(){
	var nameInputHideMonday = $('#tableMondayHide').text();
	var nameInputHideThuesday = $('#tableThuesdayHide').text();
	var nameInputHideWednesday = $('#tableWednesdayHide').text();
	var nameInputHideThursday = $('#tableThursdayHide').text();
	var nameInputHideFriday = $('#tableFridayHide').text();
	var changeCalenderWeek=$('#mealPlanWeek').val();
	alert(nameInputHideThuesday);
	$.ajax({
		type:'GET',
		data:
		{
			nameMontag:nameInputHideMonday,
			kalenderwoche:changeCalenderWeek,
			nameDienstag:nameInputHideThuesday,
			nameMittwoch:nameInputHideWednesday,
			nameDonnerstag:nameInputHideThursday,
			nameFreitag:nameInputHideFriday

		},
		url:'/api/get/changeCW',
		success:function(gericht){
			
		}
	});

}



$('#sendWeekPlan').click(function(){
	changeCalenderWeekMenu();
});



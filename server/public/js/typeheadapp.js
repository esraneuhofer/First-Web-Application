var allMeals =[];
var states=[];
  $.ajax({
      async:false,
      type:'GET',
      url:'api/get/meals',
      success:function(foundMeals){
          useReturnData(foundMeals);    
      }
  });

function useReturnData(foundMeals){  
  allMeals=foundMeals;
}
 $.each(allMeals, function(i,eachMeal){
  
  states.push(eachMeal.name);
});


var substringMatcher = function(strs) {
  return function findMatches(q, cb) {
    var matches, substringRegex;

    // an array that will be populated with substring matches
    matches = [];

    // regex used to determine if a string contains the substring `q`
    substrRegex = new RegExp(q, 'i');

    // iterate through the pool of strings and for any string that
    // contains the substring `q`, add it to the `matches` array
    $.each(strs, function(i, str) {
      if (substrRegex.test(str)) {
        matches.push(str);
      }
    });

    cb(matches);
  };
};
$('#topTwo .typeahead').typeahead({
  hint: true,
  highlight: true,
  minLength: 1
},
{
  name: 'states',
  source: substringMatcher(states)
});


$('#top .typeahead').typeahead({
  hint: true,
  highlight: true,
  minLength: 1
},
{
  name: 'states',
  source: substringMatcher(states)
});
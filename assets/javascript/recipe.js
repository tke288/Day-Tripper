$( document ).ready(function(){

function recipeSearch(foodtype){
	var searchTerm = $(this).attr("data-name");
	var queryURL = "https://api.edamam.com/search?q=" + foodtype + "&app_id=c13467eb&app_key=9cd5b15a4c49f23093c8fe1f1d2c7ce4"

	$.ajax({
          url: queryURL,
          method: "GET"
	  	})
		.done(function(response) {
			console.log(response);
			

			for (var k = 0; k<10; k++){
				var foodDiv = $("<div class = 'dynCard'>");
				
				
					if (response.hits.length === 0) {
						$("#recipeOutput").append("<p>" + "Please enter valid recipe ingredient or name." + "</p>");
					};
				
				var recipeName = response.hits[k].recipe.label;
				var pOne = $("<p>").html("<h2 class='wordBreak'>" + recipeName + "</h2>");
				foodDiv.append(pOne);

				var recipePic = response.hits[k].recipe.image;
				var pTwo = $("<img class='recipeImage'>").attr("src", recipePic);
				foodDiv.append(pTwo);

				var recipeURL = response.hits[k].recipe.shareAs;
				var pThree =$("<p>").html("<a target='_blank' href='" + recipeURL + "'>" + "Get full recipe here" + "</a>");
				foodDiv.append(pThree);

				var length = response.hits[k].recipe.ingredients.length;
				
				var ingList = $("<ul class='.browser-default'>");
				for (var i = 0; i < length; i++){
					
					var ing = response.hits[k].recipe.ingredients[i].text;
					var pFour = $("<li class='loopText .browser-default'>").text(ing);
					ingList.append(pFour);
				};
				foodDiv.append(ingList);
				
				var health = response.hits[k].recipe.healthLabels;
				var pFive = $("<p class='wordBreak'>").text(health);
				foodDiv.append(pFive);
				
				$("#recipeOutput").append(foodDiv);
			}
		
		});
};


function clear(){
	$("#recipeOutput").empty();
}

$("#recipeSearch").on("click", function(event){
   var foodtype = $("#recipeInput").val().trim();
   clear();
   recipeSearch(foodtype);
   return false;
});


$("#recipeInput").keyup(function(event) {
    if (event.keyCode === 13) {
        $("#recipeSearch").click();
    }
});
	});


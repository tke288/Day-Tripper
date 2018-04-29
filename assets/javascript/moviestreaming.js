// JavaScript Document

var showSearchInput = "";
var showType = "";
var movieID = "";
var streamShowType = "";

function showStreamSearch() {

	var queryURL = "https://api-public.guidebox.com/v2/search?api_key=1c94ca8b2662e97be6c424070e65bb62ea577bf4&type=" + showType + "&field=title&query=" + showSearchInput;

	  $.ajax({
		url: queryURL,
		method: "GET"
	  }).done(function(response) {
		  console.log(response);
		  if (response.results.length == 0) {
						$("#showOutput").append("<h2>Please check show or movie spelling and button selection.</h2>");
					};
		  for (var i = 0; i < 1; i++) {
			movieID = response.results[0].id;
			  console.log(movieID);
		  };
			  
			var streamQueryURL = "https://api-public.guidebox.com/v2/" + streamShowType + "/" + movieID + "?api_key=1c94ca8b2662e97be6c424070e65bb62ea577bf4&limit=10";

				$.ajax({
					url: streamQueryURL,
					method: "GET"
				  }).done(function(newResponse) {
					console.log(newResponse);
					
					var showTitle = newResponse.title;
					var rating = newResponse.rating;
					var movieImage = newResponse.poster_120x171;
					var showImage = newResponse.artwork_208x117;
					var overview = newResponse.overview;
					var stream = "";
					var purchase = "";
					var purchaseTV = newResponse.tv_com;
					
					var streamDiv = $("<div class = 'dynCard full'>");
					
					var pOne = $("<div>").html("<h2 class='wordBreak movie-title'>" + showTitle + "</h2>");
					streamDiv.append(pOne);
					var pTwo = $("<p style='color:white' class='wordBreak'>").html("<strong>" + "Rated: " + rating + "</strong>");
					streamDiv.append(pTwo);
					
					if (streamShowType == 'movies') {
						var pThree = $("<img>").attr("src", movieImage);
						pThree.attr("alt", showSearchInput + " poster")
						streamDiv.append(pThree);
					} else {
						var pThree = $("<img>").attr("src", showImage);
						pThree.attr("alt", showSearchInput + " poster")
						streamDiv.append(pThree);
					}
					
					var pFour = $("<p class='wordBreak'>").html("<em style='color:white;'>" + overview + "</em>");
					streamDiv.append(pFour);
					
				//	var pFive = $("<div>").html("<h2 class='wordBreak'>" + showTitle + "</h2>");
//					streamDiv.append(pOne);
					
					if (streamShowType == 'movies') {
						if (newResponse.free_web_sources.length > 0) {
						streamDiv.append("<h2>Free Stream Sources:</h2>")
						};
						for (var n = 0; n < newResponse.free_web_sources.length; n++) {
							
							var streamStore = newResponse.free_web_sources[n].display_name;
							stream = newResponse.free_web_sources[n].link;

							var pFive = $("<div>").html("<a target='_blank' href=" + stream + "><button class='btn inline-button'>" + streamStore + "</button></a>");
						
							streamDiv.append(pFive);
						};
					} else {
						if (newResponse.channels[0].live_stream.web.length > 0) {
						streamDiv.append("<h2>Where to Watch:</h2>")
						};
						for (var l = 0; l < newResponse.channels.length; l++) {
							for (var m = 0; m < newResponse.channels[l].live_stream.web.length; m++){
								var streamStore = newResponse.channels[l].live_stream.web[m].display_name;
								stream = newResponse.channels[l].live_stream.web[m].link;
								
							
								var pFive = $("<div>").html("<a target='_blank' href=" + stream + "><button class='btn inline-button'>" + streamStore + "</button></a>");
								streamDiv.append(pFive);
								};
						};
					};
					
					if (streamShowType == 'movies') {
						streamDiv.append("<h2>Where to Buy:</h2>");
						for (var k = 0; k < newResponse.purchase_web_sources.length; k++) {
							var store = newResponse.purchase_web_sources[k].display_name;
							purchase = newResponse.purchase_web_sources[k].link;
							var pSix = $("<div>").html("<a target='_blank' href=" + purchase + "><button class='btn inline-button' style='margin-right: 20px; margin-left: 15px'>" + store + "</button></a>");
							streamDiv.append(pSix);
							}	
						} else {
						streamDiv.append("<h2>More Info:</h2>")	
						var pSix = $("<div>").html("<a target='_blank' href=" + purchaseTV + "><button class='btn' style='margin-right: 20px; margin-left: 15px'>tv.com</button></a>");
						streamDiv.append(pSix);
					};
					
					$("#showOutput").append(streamDiv);
					
//stream = newResponse.channels[0].livestream.web[j];
					
				  });
		  });
};


function searchType () {
	if(document.getElementById('movie-button').checked) {
	  showType = "movie";
		streamShowType = "movies";
	} else if(document.getElementById('tv-button').checked) {
	  showType = "show";
		streamShowType = "shows";
	}
};
		  
$("#movieSearch").on("click", function(event){
	console.log("test");
	event.preventDefault();
	$("#showOutput").empty();
	showSearchInput = $("#showSearch").val().trim();
	searchType();
	showStreamSearch();
});

$("#showSearch").keyup(function(event) {
    if (event.keyCode === 13) {
        $("#movieSearch").click();
    }
});
//movie, person, show


function locate(zipcode){
	console.log(zipcode)
	var SearchTerm = $(this).attr("data-name");
	var queryURL = "https://autocomplete.wunderground.com/aq?query=" + zipcode;

	$.ajax({
          url: queryURL,
          method: "GET",
		  })
		.done(function(response) {
		console.log(response);

		var latitude = response.RESULTS["0"].lat;
		var longitude = response.RESULTS["0"].lon;
		console.log(latitude);
		console.log(longitude);

		$.ajax({
	            method: 'GET',
	            url: 'https://developers.zomato.com/api/v2.1/search?lat='+latitude+'&lon='+longitude+'&count=10',
                headers: { 'user-key': '8abc659c37b2bd36942c2a208a719dae'}
		}).done(function (response) {
			console.log(response);
			var rDiv = $("<div class = 'foodtype dynCard'>");

			for (var k = 0; k<10; k++){
			var rName = response.restaurants[k].restaurant.name;
			var pOne = $("<h2 class='wordBreak'>").text(rName);
			rDiv.append(pOne);

			var photo = response.restaurants[k].restaurant.thumb;
			var image = $("<img>").attr("src", photo);
			rDiv.append(image);

			var cuisine = response.restaurants[k].restaurant.cuisines;
			var pTwo = $("<p class='wordBreak'>").text(cuisine);
			rDiv.append(pTwo);

			var address = response.restaurants[k].restaurant.location.address;
			var pThree = $("<p class='wordBreak'>").text(address);
			rDiv.append(pThree);

			var menu = response.restaurants[k].restaurant.menu_url;
			var pF = $("<p class='wordBreak'>").text(menu);
			rDiv.append(pF);
			};


			$("#deliveryOutput").append(rDiv);
		});
	});
};	



$("#ZipSearch").on("click", function(event){
	var zipcode = $("#zipInput").val().trim();
    locate(zipcode);
   return false;
});


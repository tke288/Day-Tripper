// JavaScript Document

var zipcode = "";


function localMovieSearch(zipcode) { 
	var queryURL = "http://data.tmsapi.com/v1.1/movies/showings?startDate=" + "2018-01-05" + "&zip=" + zipcode + "&api_key=guyv9by6h494tz4s9xfvpqrq";
		
	
  		$.ajax({
			url: queryURL,
        	method: "GET",
			complete: function(e){
				 if (e.status === 400) {
					$("#movieZipOutput").append("<h2>Please enter your zip code.</h2>");
				};
			}
      		}).done(function(response) {
		  		console.log(response);
			
			
			
			for (var i = 0; i < 15; i++) {
				var movieName = response[i].title;
				var runtime = response[i].runTime;
				var moviePoster = response[i].preferredImage.uri;
				var rating = response[i].ratings["0"].code;
				var topCast = response[i].topCast;
				var summary = response[i].shortDescription;
				
				
				var nowPlayingDiv = $("<div class = 'dynCard'>");
				
				var pOne = $("<div>").html("<h2 class='wordBreak movie-title'>" + movieName + "</h2>");
				nowPlayingDiv.append(pOne);
				var pTwo = $("<p class='wordBreak'>").html("<em style='color:white;'>" + summary + "</em>");
				nowPlayingDiv.append(pTwo);
				var pThree = $("<h2 class='wordBreak'>").html(runtime[2,3] + " hour(s) " + runtime[5,6] + " min.");
				nowPlayingDiv.append(pThree);
				var pFour = $("<p style='color:white' class='wordBreak'>").html("<strong>" + "Rated: " + rating + "</strong>");
				nowPlayingDiv.append(pFour);
				
				for (var k = 0; k < 3; k++) {
					var pFive = $("<p class='wordBreak small'>").html(topCast[k]);
					nowPlayingDiv.append(pFive);
				};
				
				var getTicketsButton = $("<a target='_blank' href='http://www.fandango.com'><button class='btn movieTickets' style='margin-right: 20px; margin-left: 15px'>Buy Tickets</button></a>");
				getTicketsButton.attr("data-index", i);
				nowPlayingDiv.append(getTicketsButton);
				
				$("#movieZipOutput").append(nowPlayingDiv);
				
				$("#data-index" + [i]).on("click", function(event) {
					event.preventDefault();
					$("#movie-title").empty();
					$("#showtimes-output").empty();
					var currentIndex = $(this).attr("data-index");
				});
				
			}
			});
	};


$("#movieZipSearch").on("click", function(event){
	console.log("test");
	event.preventDefault();
	$("#movieZipOutput").empty();
	zipcode = $("#zipInput").val().trim();
	localMovieSearch(zipcode);
	locate(zipcode);

});




function locate(zipcode){
	var SearchTerm = $(this).attr("data-name");
	var queryURL = "http://autocomplete.wunderground.com/aq?query=" + zipcode;

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



$("#deliverySearch").on("click", function(event){
	var zipcode = $("#zipInput").val().trim();
    locate(zipcode);
   return false;
});


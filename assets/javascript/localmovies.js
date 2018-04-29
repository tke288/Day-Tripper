// JavaScript Document
$( document ).ready(function(){
	
	//moment variables
	var year = moment().year();
	var month = moment().month();
	var date = moment().date();
	var zipcode = "";
	var todaysDate = year + "-" + (month + 1) + "-" + date;


	function localMovieSearch(zipcode) { 
		var queryURL = "https://data.tmsapi.com/v1.1/movies/showings?startDate=" + todaysDate + "&zip=" + zipcode + "&api_key=mxf9w6dyukegk3x3jfmpfqqu";

			//local movies in theaters ajax
			$.ajax({
				url: queryURL,
				method: "GET",
				
				//error message
				complete: function(e){
					 if (e.status === 400) {
						$("#movieZipOutput").append("<h2>Please enter your zip code.</h2>");
					};
				}
				}).done(function(response) {
					console.log(response);


				//api call response loop
				for (var i = 0; i < 15; i++) {
					//variable definitions for response
					var movieName = response[i].title;
					var runtime = response[i].runTime;
					var rating = response[i].ratings[0].code;
					var topCast = response[i].topCast;
					var summary = response[i].shortDescription;

					//main div
					var nowPlayingDiv = $("<div class = 'dynCard'>");
					
					//movie name div
					var pOne = $("<div>").html("<h2 class='wordBreak movie-title'>" + movieName + "</h2>");
					nowPlayingDiv.append(pOne);
					
					//movie summary div
					var pTwo = $("<p class='wordBreak'>").html("<em style='color:white;'>" + summary + "</em>");
					nowPlayingDiv.append(pTwo);
					
					//runtime div
					var pThree = $("<h2 class='wordBreak'>").html(runtime[3] + " hour(s) " + runtime[5] + runtime[6] + " min.");
					nowPlayingDiv.append(pThree);
					
					//rating div
					var pFour = $("<p style='color:white' class='wordBreak'>").html("<strong>" + "Rated: " + rating + "</strong>");
					nowPlayingDiv.append(pFour);
					
					//cast loop
					for (var k = 0; k < 3; k++) {
						var pFive = $("<p class='wordBreak small'>").html(topCast[k]);
						nowPlayingDiv.append(pFive);
					};
					
					//get tickets button
					var getTicketsButton = $("<a target='_blank' href='https://www.fandango.com'><button class='btn movieTickets' style='margin-right: 20px; margin-left: 15px'>Buy Tickets</button></a>");
					getTicketsButton.attr("data-index", i);
					nowPlayingDiv.append(getTicketsButton);

					//append main div
					$("#movieZipOutput").append(nowPlayingDiv);

					//on click get tickets button
					$("#data-index" + [i]).on("click", function(event) {
						event.preventDefault();
						$("#movie-title").empty();
						$("#showtimes-output").empty();
						var currentIndex = $(this).attr("data-index");
					});

				}
				});
		};
	//on click run function
	$("#movieZipSearch").on("click", function(event){
		console.log("test");
		event.preventDefault();
		$("#movieZipOutput").empty();
		zipcode = $("#zipInput").val().trim();
		localMovieSearch(zipcode);

	});
});
$( document ).ready(function(){
	var zipCode = "";

	//moment variables
	var year = moment().year();
	var month = moment().month();
	var monthName = "";
	var date = moment().date();
	var zipcode = "";
	var formattedDate = date + "+" + monthName + "+" + year;

	//month name conditionals
	if (month === 0) {
		monthName = "January";
	}else if (month === 1){
		monthName = "February";
	}else if (month === 2) {
	   monthName = "March";
	}else if (month === 3) {
	  monthName = "April";
	}else if (month === 4) {
	   monthName = "May";
	}else if (month === 5) {
	   monthName = "June";
	}else if (month === 6) {
	   monthName = "July";
	}else if (month === 7) {
	   monthName = "August";
	}else if (month === 8) {
	   monthName = "September";
	}else if (month === 9) {
	   monthName = "October";
	}else if (month === 10) {
	   monthName = "November";
	}else if (month === 11) {
	   monthName = "December";
	};

	function eventfulInfo(){
		var queryURL = "https://api.eventful.com/rest/events/search?&q=music&l=" + zipCode + "&within=10&units=miles&t=" + formattedDate + "&app_key=xknQ6SvQTNHGgt7Q";
		
			//eventful ajax
			$.ajax({
				method: "GET",
				url: queryURL,             

				   }).done(function(response) {
					console.log(response);
				
					//get xml events
					var events = response.getElementsByTagName("events");
					console.log(events);
				
					//resopnse for loop
					for (var i = 0; i < 9; i++) {
						
							//main div
							var eventfulDiv= $("<div class = 'dynCard'>");
						
							//event title
							var eventName = events[0].getElementsByTagName("title");
							var p1= $("<h2 style='padding:7px; margin:10px 0' class='wordBreak'>").html(eventName[i].innerHTML + "<hr style='margin:5px 0 0 0;'>");
							eventfulDiv.append(p1);
						
							//event venue name
							var eventVenue = events[0].getElementsByTagName("venue_name");
							var p2= $("<p style='font-weight:700;' class='wordBreak'>").text("Venue: " + eventVenue[i].innerHTML);
							eventfulDiv.append(p2);
						
							//event venue address					   
							var eventAddress = events[0].getElementsByTagName("venue_address");
							var p5= $("<p style='color:white; font-style:italic; margin:-15px 0 0 0;' class='wordBreak'>").text("Address: " + eventAddress[i].innerHTML);
							eventfulDiv.append(p5);
						
							//event start time 
							var eventStartTime = events[0].getElementsByTagName("start_time");
							var eventDate = JSON.stringify(eventStartTime[i].innerHTML).substr(1, 10);
							var eventTime = JSON.stringify(eventStartTime[i].innerHTML).substr(12, 16);
							var p3= $("<p class='wordBreak'>").html("Date: " + eventDate + "<br>Time: " + eventTime.substr(0,5));
							eventfulDiv.append(p3);
						
							//event url
							var eventUrl = events[0].getElementsByTagName("venue_url");
							var p4= $("<p class='wordBreak'>").html("<a target='_blank' href='" + eventUrl[i].innerHTML + "'>More Info</a>");
							eventfulDiv.append(p4);

						//append main div to html
						$("#eventfulOutput").append(eventfulDiv);
						};
					});	
			};

	//on click, run function
	$("#eventfulSearch").on("click", function(event){
		zipCode = $("#zipInput").val().trim();
		$("#eventfulOutput").empty();
		eventfulInfo();
	   return false;
	});
});
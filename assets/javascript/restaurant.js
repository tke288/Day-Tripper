$( document ).ready(function(){

	var zipCode = "";

	function locate(zipCode){
		var SearchTerm = $(this).attr("data-name");
		var queryURL = "https://api.wunderground.com/api/79db6a03d8151c8c/geolookup/q/" + zipCode + ".json" ;
		
		//zip code to lat long ajax
		$.ajax({
			  url: queryURL,
			  method: "GET"
			})
			.done(function(response) {
				console.log(response);
			
				//lat long var definition
				var latitude = response.location.lat;
				var longitude = response.location.lon;
				console.log(latitude);
				console.log(longitude);
			
				//local restaurants ajax
				$.ajax({
						method: 'GET',
						url: 'https://developers.zomato.com/api/v2.1/search?lat='+latitude+'&lon='+longitude+'&count=10',
						headers: { 'user-key': '8abc659c37b2bd36942c2a208a719dae'}
				}).done(function (response) {

					console.log(response);


					//response for loop
					for (var k = 0; k<10; k++){
						//main div
						var rDiv = $("<div class='dynCard'>");
						
						//restaurant name
						var rName = response.restaurants[k].restaurant.name;
						var pOne = $("<div>").html("<h2 class='wordBreak'>" + rName + "</h2>");
						rDiv.append(pOne);
						
						//restaurant photo
						var photo = response.restaurants[k].restaurant.thumb;
						if (response.restaurants[k].restaurant.thumb == "") {
							} 
						else {
							var image = $("<img class='rImage'>").attr("src", photo);
							rDiv.append(image);
							};
						
						//restaurant cuisine
						var cuisine = response.restaurants[k].restaurant.cuisines;
						var pTwo = $("<div class='wordBreak'>").html("<p>Cuisine: " + cuisine);
						rDiv.append(pTwo);
						
						//restaurant address
						var address = response.restaurants[k].restaurant.location.address;
						var pThree = $("<p class='wordBreak' style='color:white;'>").text(address);
						rDiv.append(pThree);
						
						//restraurant menu
						var menu = response.restaurants[k].restaurant.menu_url;
						var pF = $("<div>").append("<a target='_blank' href=" + menu + "><button class='btn inline-button'>" + "Get Menu" + "</button></a>");
						rDiv.append(pF);

						//append main div
						$("#deliveryOutput").append(rDiv);
					};	
				});
			});
	};	

	//on click, run function
	$("#deliverySearch").on("click", function(event){
		zipCode = $("#zipInput").val().trim();
		$("#deliveryOutput").empty();
		locate(zipCode);
	   return false;
	});
});


//old code
// function gps(){
// var latitude = "";
// var longitude = "";
          
//           if (navigator.geolocation) {
//             navigator.geolocation.getCurrentPosition(function(position) {
//               var pos = {
//                 lat: position.coords.latitude,
//                 lng: position.coords.longitude,
				  
//               };
// 				longitude = position.coords.longitude;
// 				latitude = position.coords.latitude;
// 				console.log(latitude);
// 				console.log(longitude);
//           })
//     locate();
// };

// }
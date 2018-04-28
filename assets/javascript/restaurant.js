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

function locate(zipCode){
	var SearchTerm = $(this).attr("data-name");
	var queryURL = "http://autocomplete.wunderground.com/aq?query=" + zipCode;

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
	var zipCode = $("#zipInput").val().trim();
    locate(zipCode);
   return false;
});


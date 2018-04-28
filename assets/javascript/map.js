
var latitude = "";
var longitude = "";
var map, infoWindow;
        function initMap() {
          map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: -34.397, lng: 150.644},
            zoom: 18
          });
          infoWindow = new google.maps.InfoWindow;

          // Try HTML5 geolocation.
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
              var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
				  
              };
				longitude = position.coords.longitude;
				latitude = position.coords.latitude;
				console.log(latitude);
				console.log(longitude);
              infoWindow.setPosition(pos);
              infoWindow.setContent('Location found.');
              infoWindow.open(map);
              map.setCenter(pos);
            }, function() {
              handleLocationError(true, infoWindow, map.getCenter());
            });
          } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
          }
        };

        function handleLocationError(browserHasGeolocation, infoWindow, pos) {
          infoWindow.setPosition(pos);
          infoWindow.setContent(browserHasGeolocation ?
                                'Error: The Geolocation service failed.' :
                                'Error: Your browser doesn\'t support geolocation.');
          infoWindow.open(map);
        };

//working on code to convert lat and long to physical address. How do I make it wait to locate lat and long before running this function
//http://techslides.com/convert-latitude-and-longitude-to-a-street-address
//want to print street address in sidebar beside map
//function addressConvert() {
	
	//var queryUrl = "http://maps.googleapis.com/maps/api/geocode/json?latlng=" + latitude + "," + longitude + "&sensor=false"

	//$.ajax({
			//url: queryURL,
			//method: "GET"
		//  }).done(function(response) {
				//console.log(respone);
		//	});
	//};

//addressConvert();

	
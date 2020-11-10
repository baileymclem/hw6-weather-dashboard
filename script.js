//

//once DOM load, run jquery
$(document).ready(function(){

    var apiKey = '1453ed8356c0e4fbc69da4446bd93e17'

    // var title = "space+jam";
    // var queryURL = "https://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=trilogy";

    $('.btn').on('click', function(e){
        e.preventDefault();

        var cityName = $('#cityNameText').val().trim(); 

        console.log('cityName', cityName)
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" +apiKey;
    
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
          console.log('res', response);
          var temp = response.main.temp;
          var humidity = response.main.humidity;
          var windSpeed = response.wind.speed;

          var weatherForecaseEL = $("#weatherForecast")

          var tempEl = $('<p>');
          tempEl.text(`Temp: ` + temp);

          var humidityEl = $('<p>');
          humidityEl.text('Humidity ' + humidity);

          weatherForecaseEL.append(tempEl);
          weatherForecaseEL.append(humidityEl);




        });

    })


})


//

//once DOM load, run jquery
$(document).ready(function () {

  var apiKey = '1453ed8356c0e4fbc69da4446bd93e17'

  //search city name

  $('.btn').on('click', function (e) {
    e.preventDefault();

    var cityName = $('#cityNameText').val().trim();


    console.log('cityName', cityName)
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;

    // var queryURL2 = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityId +"&appid=" + apiKey;

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      console.log('res', response);
      var name = response.name;
      var temp = response.main.temp;
      var humidity = response.main.humidity;
      var windSpeed = response.wind.speed;
      var uvIndex = response.wind.speed;
      var cityId = response.id;

      console.log("cityId", cityId);


      var weatherForecaseEL = $("#weatherForecast")

      var nameEl = $('<h1>');
      nameEl.text(name);

      var tempEl = $('<p>');
      tempEl.text(`Temp: ` + temp);

      var humidityEl = $('<p>');
      humidityEl.text('Humidity: ' + humidity);

      var windSpeedEl = $('<p>');
      windSpeedEl.text('Wind Speed: ' + windSpeed);

      var uvIndexEl = $('<p>');
      uvIndexEl.text(`UV Index: ` + uvIndex);

      weatherForecaseEL.append(nameEl);
      weatherForecaseEL.append(tempEl);
      weatherForecaseEL.append(humidityEl);
      weatherForecaseEL.append(windSpeedEl);
      weatherForecaseEL.append(uvIndexEl);




    })

    // $.ajax({
    //   url: queryURL2,
    //   method: "GET"
    // }).then(function (response) {

    // })

  })




})


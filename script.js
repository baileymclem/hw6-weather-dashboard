//once DOM loads, run jquery
$(document).ready(function () {
  //api key
  var apiKey = "1453ed8356c0e4fbc69da4446bd93e17";

  //search event
  $(".btn").on("click", function (e) {
    e.preventDefault();

    var cityName = $("#cityNameText").val().trim();

    setCityList(cityName);

    apiCall(cityName);

    apiCallTwo(cityName);
  });

  //pull cities searched out of local stoarge and push them onto an array
  var cityList = JSON.parse(localStorage.getItem("name")) || [];

  function setCityList(cityName) {
    cityList.push(cityName);
    localStorage.setItem("name", JSON.stringify(cityList));
  }

  //create a list element in the DOM to display the cities searched (cityList) for the user's search history
  var ul = $(".list-group");


  cityList.slice(-8).some((item, index) => {
    var li = $("<li>");
    li.text(item).addClass("list-group-item");
    ul.append(li);

    if (index === 8) {
      return true;
    }
  });

  //function containing first api call to get current weather
  function apiCall(cityName) {
    var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityName +
      "&units=imperial&appid=" +
      apiKey;
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      var name = response.name;
      var temp = response.main.temp;
      var humidity = response.main.humidity;
      var windSpeed = response.wind.speed;
      var uvIndex = response.wind.speed;
      var weatherForecaseEL = $("#weatherForecast");
      weatherForecaseEL.empty();
      var nameEl = $("<h1>");
      nameEl.text(name);
      var currentDate = moment().format("MMM Do YYYY");

      var icon = $(
        `<img src=" http://openweathermap.org/img/wn/${response.weather[0].icon}.png">`
      );

      var tempEl = $("<div>");
      tempEl.text(`Temp: ` + temp);

      var humidityEl = $("<div>");
      humidityEl.text("Humidity: " + humidity);

      var windSpeedEl = $("<div>");
      windSpeedEl.text("Wind Speed: " + windSpeed);

      //UV Index conditions
      var uvIndexEl = $("<div>").text("Uv: ");
      var uvIndexSpanEl = $("<span>");
      uvIndexSpanEl.text(uvIndex);
      if (uvIndex < 3) {
        uvIndexSpanEl.addClass("good");
      } else if (uvIndex > 5) {
        uvIndexSpanEl.addClass("bad");
      } else {
        uvIndexSpanEl.addClass("moderate");
      }
      uvIndexEl.append(uvIndexSpanEl);

      weatherForecaseEL.append(nameEl);
      weatherForecaseEL.append(currentDate);
      weatherForecaseEL.append(icon);
      weatherForecaseEL.append(tempEl);
      weatherForecaseEL.append(humidityEl);
      weatherForecaseEL.append(windSpeedEl);
      weatherForecaseEL.append(uvIndexEl);
    });
  }

  //create a DOM element to display the searched for city current weather
  $(ul).on("click", "li", function () {
    let cityName = $(this).text();


    setCityList(cityName);

    apiCall(cityName);

    apiCallTwo(cityName);
  });

  //second api call for five day forecast
  function apiCallTwo(cityName) {
    var queryURLTwo =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      cityName +
      "&units=imperial&appid=" +
      apiKey;

    $.ajax({
      url: queryURLTwo,
      method: "GET",
    }).then(function (response) {
      let forecast = response.list;

      let forecastData = forecast.filter(function (days) {
        return days.dt_txt.includes("12:00:00");
      });

      $("#fiveDayForecast").empty();

      //Five day forecast
      var fiveDayRowEl = $("#fiveDayForecast");
      forecastData.map((data) => {
        console.log("data", data);
        var divContainerEl = $('<div class="col-sm">');

        var pdateEl = $("<p id='date'>").text(data.dt_txt.split(" ")[0]);
        var pEl = $("<p>").text(`Humidity: ${data.main.humidity}`);
        var ptempEl = $("<p>").text(`Temp: ${data.main.temp}`);

        var icon = $(
          `<img src=" http://openweathermap.org/img/wn/${data.weather[0].icon}.png">`
        );

        divContainerEl.append(pdateEl, icon, ptempEl, pEl);
        fiveDayRowEl.append(divContainerEl);
      });
    });
  }
});

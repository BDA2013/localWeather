//Value
const locationInput = document.getElementById("locationInput");
const weatherButton = document.getElementById("getWeather");
const locationList = document.getElementById("locationList");
const forecastVisability = document.getElementById("results");
const locationPost = document.getElementById("location");
let list = [];

function unixTimestampTo12Hour(t) {
  const dt = new Date(t * 1000);
  const month = dt.toLocaleString("en-US", { month: "long" });
  const day = dt.toLocaleString("en-US", { day: "numeric" });
  const year = dt.toLocaleString("en-US", { year: "numeric" });
  let hours = dt.getHours();
  const minutes = "0" + dt.getMinutes();
  const AmOrPm = hours >= 12 ? 'pm' : 'am';
  hours = (hours % 12) || 12;
  const finalDate = month + " " + day + ", " + year;
  const finalTime = hours + ":" + minutes + " " + AmOrPm;
  return (finalDate + "  " + finalTime)
}

function millitaryTo12Hour(t) {
  var time = t.split(':');
  var hours = (parseInt(time[0]) % 12) || 12 // gives the value in 24 hours format
  var minutes = "0" + parseInt(time[1]);
  var amOrPm = hours >= 12 ? 'pm' : 'am';
  return `${hours}:${minutes} ${amOrPm}`;

}

// Current Day
var day0Label = document.getElementById("day0");
var currentIcon = document.getElementById("currentIcon");
var currentTemp = document.getElementById("currentTemperature");
var currentCond = document.getElementById("currentCondition");
var currentWind = document.getElementById("currentWindSpeed");
var currentHumi = document.getElementById("currentHumidity");

// 5-day forecast
var day1Label = document.getElementById("day1");
var day1Icon = document.getElementById("day1Icon");
var day1Temp = document.getElementById("day1Temperature");
var day1Cond = document.getElementById("day1Condition");
var day1Wind = document.getElementById("day1WindSpeed");
var day1Humi = document.getElementById("day1Humidity");

var day2Label = document.getElementById("day2");
var day2Icon = document.getElementById("day2Icon");
var day2Temp = document.getElementById("day2Temperature");
var day2Cond = document.getElementById("day2Condition");
var day2Wind = document.getElementById("day2WindSpeed");
var day2Humi = document.getElementById("day2Humidity");

var day3Label = document.getElementById("day3");
var day3Icon = document.getElementById("day3Icon");
var day3Temp = document.getElementById("day3Temperature");
var day3Cond = document.getElementById("day3Condition");
var day3Wind = document.getElementById("day3WindSpeed");
var day3Humi = document.getElementById("day3Humidity");

var day4Label = document.getElementById("day4");
var day4Icon = document.getElementById("day4Icon");
var day4Temp = document.getElementById("day4Temperature");
var day4Cond = document.getElementById("day4Condition");
var day4Wind = document.getElementById("day4WindSpeed");
var day4Humi = document.getElementById("day4Humidity");

function gatherLatLon(city, state) {
  fetch(`https://api.geoapify.com/v1/geocode/search?city=${city}&state=${state}&format=json&apiKey=ff79fe741988451695b4d420a554505d`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      locationLon = data.results[0].lon;
      locationLat = data.results[0].lat;
      gatherWeather(locationLat, locationLon);
    });
};

function gatherWeather(lat, lon) {
  fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=89d3bde90b46aeb52fc0fca5cffee20e`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      const weather = data.list;
      let selectedDate = unixTimestampTo12Hour(parseInt(weather[0].dt));
      let slicedDate = selectedDate.split("  ");
      day0Label.innerHTML = slicedDate[0];
      currentTemp.innerHTML = parseInt(weather[0].main.temp) + "°F";
      currentCond.innerHTML = weather[0].weather[0].description;
      currentWind.innerHTML = parseInt(weather[0].wind.speed) + " MPH";
      currentHumi.innerHTML = weather[0].main.humidity + "%";

      let storedTimestamp = parseInt(weather[0].dt);
      let startingDateTime = unixTimestampTo12Hour(storedTimestamp).split("  ");
      //5-Day Forecast
      for (var d = 0; d < 5; d++) {
        switch (d) {
          case 0:
            for (var i = 1; i < weather.length; i++) {
              selectedDate = unixTimestampTo12Hour(parseInt(weather[i].dt));
              slicedDate = selectedDate.split("  ");
              if (parseInt(weather[i].dt) > storedTimestamp) {
                if (slicedDate[1] === startingDateTime[1]) {
                  day1Label.innerHTML = slicedDate[0];
                  day1Temp.innerHTML = parseInt(weather[i].main.temp) + "°F";
                  day1Cond.innerHTML = weather[i].weather[0].description;
                  day1Wind.innerHTML = parseInt(weather[i].wind.speed) + " MPH";
                  day1Humi.innerHTML = weather[i].main.humidity + "%";
                  storedTimestamp = weather[i].dt;
                  break;
                };
              };
            };
          case 1:
            for (var i = 1; i < weather.length; i++) {
              selectedDate = unixTimestampTo12Hour(parseInt(weather[i].dt));
              slicedDate = selectedDate.split("  ");
              if (parseInt(weather[i].dt) > storedTimestamp) {
                if (slicedDate[1] === startingDateTime[1]) {
                  day2Label.innerHTML = slicedDate[0];
                  day2Temp.innerHTML = parseInt(weather[i].main.temp) + "°F";
                  day2Cond.innerHTML = weather[i].weather[0].description;
                  day2Wind.innerHTML = parseInt(weather[i].wind.speed) + " MPH";
                  day2Humi.innerHTML = weather[i].main.humidity + "%";
                  storedTimestamp = weather[i].dt;
                  break;
                };
              };
            };

          case 2:
            for (var i = 1; i < weather.length; i++) {
              selectedDate = unixTimestampTo12Hour(parseInt(weather[i].dt));
              slicedDate = selectedDate.split("  ");
              if (parseInt(weather[i].dt) > storedTimestamp) {
                if (slicedDate[1] === startingDateTime[1]) {
                  day3Label.innerHTML = slicedDate[0];
                  day3Temp.innerHTML = parseInt(weather[i].main.temp) + "°F";
                  day3Cond.innerHTML = weather[i].weather[0].description;
                  day3Wind.innerHTML = parseInt(weather[i].wind.speed) + " MPH";
                  day3Humi.innerHTML = weather[i].main.humidity + "%";
                  storedTimestamp = weather[i].dt;
                  break;
                };
              };
            };

          case 3:
            for (var i = 1; i < weather.length; i++) {
              selectedDate = unixTimestampTo12Hour(parseInt(weather[i].dt));
              slicedDate = selectedDate.split("  ");
              if (parseInt(weather[i].dt) > storedTimestamp) {
                //console.log("Time from data: " + slicedDate[1]);
                if (slicedDate[1] === startingDateTime[1]) {
                  day4Label.innerHTML = slicedDate[0];
                  day4Temp.innerHTML = parseInt(weather[i].main.temp) + "°F";
                  day4Cond.innerHTML = weather[i].weather[0].description;
                  day4Wind.innerHTML = parseInt(weather[i].wind.speed) + " MPH";
                  day4Humi.innerHTML = weather[i].main.humidity + "%";
                  storedTimestamp = weather[i].dt;
                  break;
                };
              };
            };
        };
        forecastVisability.style.visibility = "visible";
      };
    });
};

function gatherLocationInput(value) {
  var location = value;
  var inputArray = location.split(',');

  var fixedStateArray = inputArray[1].trimStart();
  inputArray[1] = fixedStateArray;

  gatherLatLon(inputArray);
};

function storeLocationInput(value) {
  var location = value;
  var newButton = document.createElement("button");
  newButton.setAttribute("id", "pastLocation")
  newButton.innerHTML = location;
  newButton.value = location;
  locationList.appendChild(newButton);
  list.push(newButton.value);

  locationSaved()
};

function locationSaved() {
  for (var i = 0; i < list.length; i++) {
    var name = "storedLocation" + [i];
    localStorage.setItem(name, list[i]);
  }
}

function locationLoad() {
  for (var i = 0; i < localStorage.length; i++) {
    const storedLocation = localStorage.getItem('storedLocation' + [i]);
    list.push(storedLocation);
    var location = list[i];
    var newButton = document.createElement("button");
    newButton.setAttribute("id", "pastLocation")
    newButton.innerHTML = location;
    newButton.value = location;
    locationList.appendChild(newButton);
    //console.log(list);
  }
}

locationLoad();

weatherButton.addEventListener('click', function () {
  var locationTyped = locationInput.value;
  if (forecastVisability.style.visibility == "visible") {
    forecastVisability.style.visibility = "hidden";
    gatherLocationInput(locationTyped);
    storeLocationInput(locationTyped);
    locationPost.innerHTML = locationTyped;
  } else {
    gatherLocationInput(locationTyped);
    storeLocationInput(locationTyped);
    locationPost.innerHTML = locationTyped;
  }
});

locationInput.addEventListener('keypress', function (e) {
  var locationTyped = locationInput.value;
  if (e.key === 'Enter') {
    if (forecastVisability.style.visibility == "visible") {
      forecastVisability.style.visibility = "hidden";
      gatherLocationInput(locationTyped);
      storeLocationInput(locationTyped);
      locationPost.innerHTML = locationTyped
    } else {
      gatherLocationInput(locationTyped);
      storeLocationInput(locationTyped);
      locationPost.innerHTML = locationTyped;
    }
  }
});

locationList.addEventListener('click', function (e) {
  if (forecastVisability.style.visibility == "visible") {
    forecastVisability.style.visibility = "hidden";
    gatherLocationInput(e.target.value)
    locationPost.innerHTML = e.target.value;
  } else {
    gatherLocationInput(e.target.value)
    locationPost.innerHTML = e.target.value;
  }
});



// display the current date and time

let now = new Date();
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}
let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
let day = days[now.getDay()];

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];

let dayHour = document.querySelector("#city-date-time");
dayHour.innerHTML = `<em>Last Updated: ${day} ${now.getDate()} ${month} ${now.getFullYear()}, ${hour}:${minute}</em>`;

// Five Day Forecast
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  console.log(response.data.daily);

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col-2">
    <div class="weather-forecast-day">${formatDay(forecastDay.dt)}</div>
    <img src="http://openweathermap.org/img/wn/${
      forecastDay.weather[0].icon
    }@2x.png" alt="" width="42"/>
    
    <div class="weather-forecast-Temperatures">
    <span class="high-temp" id="high-temp">${Math.round(forecastDay.temp.max)}°
    </span>
    <span class="low-temp" id="low-temp">${Math.round(
      forecastDay.temp.min
    )}°</span>
    </div>
    </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "4bb9d229a9e1ba598b33d76f997d3e5c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}
// Search Bar/ Geolocation

function showTemperature(response) {
  let cityName = document.querySelector("h1");
  cityName.innerHTML = response.data.name;

  let weatherDescription = document.querySelector("#weathertype");
  weatherDescription.innerHTML = response.data.weather[0].main;

  let cityTemperature = document.querySelector("#temp-number");
  cityTemperature.innerHTML = Math.round(response.data.main.temp);

  celsuisTemperature = Math.round(response.data.main.temp);
  celsuisWind = Math.round(response.data.wind.speed * 2.236936);
  maxCelsuisTemperature = Math.round(response.data.main.temp_max);
  minCelsuisTemperature = Math.round(response.data.main.temp_min);

  let displayMaxTemp = Math.round(response.data.main.temp_max);
  let showMaxTemp = document.querySelector("#maxTemp");
  showMaxTemp.innerHTML = `High: ${displayMaxTemp}°C`;

  let displayMinTemp = Math.round(response.data.main.temp_min);
  let showMinTemp = document.querySelector("#minTemp");
  showMinTemp.innerHTML = `Low: ${displayMinTemp}°C`;

  let displayHumidity = Math.round(response.data.main.humidity);
  let showHumidity = document.querySelector("#humidityInfo");
  showHumidity.innerHTML = `Humidity: ${displayHumidity}%`;

  let displayWind = Math.round(response.data.wind.speed * 2.236936);
  let showWind = document.querySelector("#windInfo");
  showWind.innerHTML = `Wind: ${displayWind} mph`;

  let displayMainIcon = document.querySelector("#icon");
  displayMainIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "4bb9d229a9e1ba598b33d76f997d3e5c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function citySubmit(event) {
  event.preventDefault();

  let city = document.querySelector("#city-input").value;
  searchCity(city);

  celsuisLink.style.color = "#5f5459";
  fahrenheitLink.style.color = "#cdcccd";
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", citySubmit);

function searchLocation(position) {
  let apiKey = "4bb9d229a9e1ba598b33d76f997d3e5c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);

  celsuisLink.style.color = "#5f5459";
  fahrenheitLink.style.color = "#cdcccd";
}

let showCurrentLocation = document.querySelector(".current-btn");
showCurrentLocation.addEventListener("click", getCurrentLocation);

// Convert temperature to celsius & fahrenheit

function displayfahrenheitTemperature(event) {
  event.preventDefault();
  celsuisLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  let fahrenheitTemperature = (celsuisTemperature * 9) / 5 + 32;
  let cityTemperature = document.querySelector("#temp-number");
  cityTemperature.innerHTML = Math.round(fahrenheitTemperature);

  let maxFahrenheitTemperature = (maxCelsuisTemperature * 9) / 5 + 32;
  let displayMaxTemp = document.querySelector("#maxTemp");
  displayMaxTemp.innerHTML = `High: ${Math.round(maxFahrenheitTemperature)}°F`;

  let minFahrenheitTemperature = (minCelsuisTemperature * 9) / 5 + 32;
  let displayMinTemp = document.querySelector("#minTemp");
  displayMinTemp.innerHTML = `Low: ${Math.round(minFahrenheitTemperature)}°F`;

  let displayFahrenheitWind = celsuisWind * 1.609344;
  let showFahrenheitWind = document.querySelector("#windInfo");
  showFahrenheitWind.innerHTML = `Wind: ${Math.round(
    displayFahrenheitWind
  )} km/h`;

  fahrenheitLink.style.color = "#5f5459";
  celsuisLink.style.color = "#cdcccd";
}

let fahrenheitLink = document.querySelector("#temp-fahrenheit");
fahrenheitLink.addEventListener("click", displayfahrenheitTemperature);

function displayCelsuisTemperature(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celsuisLink.classList.add("active");

  let cityTemperature = document.querySelector("#temp-number");
  cityTemperature.innerHTML = Math.round(celsuisTemperature);

  let displayMaxTemp = document.querySelector("#maxTemp");
  displayMaxTemp.innerHTML = `High: ${Math.round(maxCelsuisTemperature)}°C`;

  let displayMinTemp = document.querySelector("#minTemp");
  displayMinTemp.innerHTML = `Low: ${Math.round(minCelsuisTemperature)}°C`;

  let displayCelsuisWind = document.querySelector("#windInfo");
  displayCelsuisWind.innerHTML = `Wind: ${Math.round(celsuisWind)} mph`;

  celsuisLink.style.color = "#5f5459";
  fahrenheitLink.style.color = "#cdcccd";
}

let celsuisLink = document.querySelector("#temp-celsius");
celsuisLink.addEventListener("click", displayCelsuisTemperature);

let celsuisTemperature = null;
//

searchCity("London");

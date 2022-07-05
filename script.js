// display the current date and time using JavaScript: ie Tuesday 16:00

let now = new Date();
let hours = now.getHours();
let minutes = now.getMinutes();
let dayToday = now.getDay();

if (hours < 10) {
  hours = `0${hours}`;
}

if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let dayHour = document.querySelector("#city-date-time");
dayHour.innerHTML = `Last Updated: ${days[dayToday]} ${hours}:${minutes}`;

// Search Bar/ Geolocation

function showTemperature(response) {
  let cityName = document.querySelector("h1");
  cityName.innerHTML = response.data.name;

  let weatherDescription = document.querySelector("#weathertype");
  weatherDescription.innerHTML = response.data.weather[0].main;

  let cityTemperature = document.querySelector("#temp-number");
  cityTemperature.innerHTML = Math.round(response.data.main.temp);

  celsuisTemperature = Math.round(response.data.main.temp);
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

  let displayWind = Math.round(response.data.wind.speed);
  let showWind = document.querySelector("#windInfo");
  showWind.innerHTML = `Wind: ${displayWind}km/h`;

  let displayMainIcon = document.querySelector("#icon");
  displayMainIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
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
}

let showCurrentLocation = document.querySelector(".current-btn");
showCurrentLocation.addEventListener("click", getCurrentLocation);

// Convert temperature to celsius & fahrenheit

function displayfahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsuisTemperature * 9) / 5 + 32;
  let cityTemperature = document.querySelector("#temp-number");
  cityTemperature.innerHTML = Math.round(fahrenheitTemperature);

  let maxFahrenheitTemperature = (maxCelsuisTemperature * 9) / 5 + 32;
  let displayMaxTemp = document.querySelector("#maxTemp");
  displayMaxTemp.innerHTML = `High: ${Math.round(maxFahrenheitTemperature)}°F`;

  let minFahrenheitTemperature = (minCelsuisTemperature * 9) / 5 + 32;
  let displayMinTemp = document.querySelector("#minTemp");
  displayMinTemp.innerHTML = `Low: ${Math.round(minFahrenheitTemperature)}°F`;
}

let fahrenheitLink = document.querySelector("#temp-fahrenheit");
fahrenheitLink.addEventListener("click", displayfahrenheitTemperature);

function displayCelsuisTemperature(event) {
  event.preventDefault();
  let cityTemperature = document.querySelector("#temp-number");
  cityTemperature.innerHTML = Math.round(celsuisTemperature);

  let displayMaxTemp = document.querySelector("#maxTemp");
  displayMaxTemp.innerHTML = `High: ${Math.round(maxCelsuisTemperature)}°C`;

  let displayMinTemp = document.querySelector("#minTemp");
  displayMinTemp.innerHTML = `Low: ${Math.round(minCelsuisTemperature)}°C`;
}

let celsuisLink = document.querySelector("#temp-celsius");
celsuisLink.addEventListener("click", displayCelsuisTemperature);

let celsuisTemperature = null;

searchCity("London");

// Weather Icons

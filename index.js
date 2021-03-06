let h4 = document.querySelector("h4");
let currentDate = new Date();
let year = currentDate.getFullYear();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];
let day = days[currentDate.getDay()];
let months = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "11"
];
let month = months[currentDate.getMonth()];
let date = currentDate.getDate();
let hour = currentDate.getHours();
let minutes = currentDate.getMinutes();
if (hour < 10) {
  hour = "0" + hour;
}
if (minutes < 10) {
  minutes = "0" + minutes;
}
h4.innerHTML = `${day}, ${date}/${month}/${year}, ${hour}h${minutes}`;

function displayWeatherCondition(response) {
  document.querySelector("#cityTbc").innerHTML = response.data.name;
  document.querySelector("#mainTemperature").innerHTML = Math.round(
    response.data.main.temp
  );
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  celsiusTemperature = response.data.main.temp;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#sky").innerHTML = response.data.weather[0].main;
  document.querySelector("#dailyMaxTem").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#dailyMinTem").innerHTML = Math.round(
    response.data.main.temp_min
  );
}
function searchCity(city) {
  let apiKey = "393488bece3879e2bb4c2caa27c7b032";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#citySearch").value;
  searchCity(city);
}
let searchForm = document.querySelector("#search-city-form");
searchForm.addEventListener("submit", handleSubmit);

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#mainTemperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#mainTemperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

searchCity("Porto");

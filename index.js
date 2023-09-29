let day = document.querySelector(".day");
let time = document.querySelector(".time");
let farenheit = document.querySelector(".farenheit");
let celcius = document.querySelector(".celcius");
let inline = document.querySelector(".inline");
const formSearch = document.getElementById("form-search");
let city = document.getElementById("selectedLocation");
const searchButton = document.getElementById("searchButton");
let cityInput = document.getElementById("city-input");
let windSpeed = document.getElementById("speed");
let windDirection = document.getElementById("direction");
let weatherH1 = document.getElementById("weather-h1");
let curLocation = document.querySelector(".curLocation");
let icon = document.getElementById("img");
let weatherTemp = document.querySelector(".inline");

let apiKey = "616b14cbd38253313b3b8852fa77335d";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
function displayTime() {
  let forecastEl = document.querySelector("#forecast");
  let forecastHTML = "";
  const times = ["11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

  times.forEach(function (time) {
    forecastHTML += `
      <div class="col">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">${time}</h5>
            <i class="fa-solid fa-sun" id="weather-icon"></i>
            <h5 class="card-title">10℃</h5>
          </div>
        </div>
      </div>`;
  });

  forecastHTML = `
    <section class="bottom">
      <div class="row" id="bottom-panel">
        ${forecastHTML}
      </div>
    </section>`;

  forecastEl.innerHTML = forecastHTML;
}

function formatDay(timesTemp) {
  let date = new Date(timesTemp * 1000);
  let day = date.getDay();
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastEl2 = document.querySelector("#forecast2");
  let forecast2HTML = "";
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecast2HTML =
        forecast2HTML +
        ` <section class="next-day-forecast">
            <div class="row">
              <div class="col-sm-2">
                <i class="" id="weather-icon">
                <img 
               src="http://openweathermap.org/img/wn/${
                 forecastDay.weather[0].icon
               }@2x.png"
               /></i>
              </div>
              <div class="col">
                <div>
                  <ul>
                  <div class="row">
                  <div class="col">
                   <li class="list-group-item" id="week-days">${formatDay(
                     forecastDay.dt
                   )}</li></div>
                   <div class="col" id="temp-right"> <span>${Math.floor(
                     forecastDay.temp.max
                   )}°</span></div>
                  </div>
                   <div class="row">
                   <div class="col"> <li class="list-group-item">${
                     forecastDay.weather[0].main
                   } </li></div>
                    <div class="col" id="temp-right"> <span>${Math.floor(
                      forecastDay.temp.min
                    )}°</span></div>
                 
                   </div>
                   
                  </ul>
                </div>
              </div>
            </div>
          </section>`;
      forecastEl2.innerHTML = forecast2HTML;
    }
  });
}

function date() {
  let date = new Date();
  day.innerHTML = `${days[date.getDay()]} ${
    months[date.getMonth()]
  } ${date.getDate()}  ${date.getFullYear()}`;
  if (date.getMinutes() < 10 || date.getHours() < 10) {
    time.innerHTML = `${date.getHours()}:0${date.getMinutes()}`;
  } else {
    time.innerHTML = `${date.getHours()}:${date.getMinutes()}`;
  }
  navigator.geolocation.getCurrentPosition(handlePosition);
}
date();

function getForecast(coordinates) {
  let apiUrl2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl2);
  axios.get(apiUrl2).then(displayForecast);
}
function showWeather(response) {
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute(
    "alt",
    `http://openweathermap.org/img/wn/${response.data.weather[0].description}@2x.png`
  );
  city.innerHTML = `${response.data.name}`;
  weatherTemp.innerHTML = `${Math.round(response.data.main.temp)} ℃`;
  windSpeed.innerHTML = `${response.data.wind.speed} m/sec`;
  weatherH1.innerHTML = `${response.data.weather[0].main}`;

  let windDeg = response.data.wind.deg;
  const windDirectionEl = getWindDirection(windDeg);
  windDirection.innerHTML = windDirectionEl;

  farenheit.addEventListener("click", (event) => {
    event.preventDefault();
    inline.innerHTML = `${Math.floor(
      (response.data.main.temp * 9) / 5 + 32
    )} ℉`;
  });

  celcius.addEventListener("click", (event) => {
    event.preventDefault();
    inline.innerHTML = `${Math.round(response.data.main.temp)} ℃`;
  });

  displayTime();
  // displayForecast();

  getForecast(response.data.coord);
}

function getWindDirection(deg) {
  const directions = [
    "North",
    "North-East",
    "East",
    "South-East",
    "South",
    "South-West",
    "West",
    "North-West",
  ];
  const index = Math.floor(((deg + 22.5) % 360) / 45);
  return directions[index];
}

function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  axios
    .get(`${apiUrl}lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
    .then(showWeather);
}

curLocation.addEventListener("click", function (event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
});

formSearch.addEventListener("submit", function (event) {
  event.preventDefault();
  city.innerHTML = cityInput.value;

  axios
    .get(`${apiUrl}q=${city.innerHTML}&appid=${apiKey}&units=metric`)
    .then(showWeather);
});

searchButton.addEventListener("click", function (event) {
  event.preventDefault();
  city.innerHTML = cityInput.value;

  axios
    .get(`${apiUrl}q=${city.innerHTML}&appid=${apiKey}&units=metric`)
    .then(showWeather);
});

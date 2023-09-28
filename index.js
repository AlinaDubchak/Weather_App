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

let apiKey = "001bc651977f4b024af4d84282b0f02a";
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
function displayForecast() {
  let forecastEl2 = document.querySelector("#forecast2");
  let forecast2HTML = "";
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];
  days.forEach(function (day) {
    date = new Date();
    forecast2HTML =
      forecast2HTML +
      ` <section class="next-day-forecast">
            <div class="row">
              <div class="col-sm-2">
                <i class="fa-solid fa-sun" id="weather-icon"></i>
              </div>
              <div class="col">
                <div>
                  <ul>
                    <li class="list-group-item">${day} ${
        months[date.getMonth()]
      } ${date.getDate()}</li>
                    <li class="list-group-item">Sunny</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>`;
    forecastEl2.innerHTML = forecast2HTML;
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

function showWeather(response) {
  console.log(response);
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
  displayForecast();
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

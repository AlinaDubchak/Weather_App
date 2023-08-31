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
}
date();
formSearch.addEventListener("submit", function (event) {
  event.preventDefault();
  city.innerHTML = cityInput.value;
});

searchButton.addEventListener("click", function (event) {
  event.preventDefault();
  city.innerHTML = cityInput.value;

  axios
    .get(`${apiUrl}q=${city.innerHTML}&appid=${apiKey}&units=metric`)
    .then(showWeather);
});

let weatherTemp = document.querySelector(".inline");
function showWeather(response) {
  city.innerHTML = `${response.data.name}`;
  weatherTemp.innerHTML = `${Math.round(response.data.main.temp)} ℃`;
  windSpeed.innerHTML = `${response.data.wind.speed} m/sec`;
  weatherH1.innerHTML = `${response.data.weather[0].main}`;

  let windDeg = response.data.wind.deg;
  if (windDeg === 0 && windDeg === 360) {
    windDirection.innerHTML = `North`;
  } else if (windDeg === 90) {
    windDirection.innerHTML = `East`;
  } else if (windDeg === 180) {
    windDirection.innerHTML = `South`;
  } else if (windDeg === 270) {
    windDirection.innerHTML = `West`;
  } else if (windDeg > 0 && windDeg < 90) {
    windDirection.innerHTML = `North-East`;
  } else if (windDeg > 90 && windDeg < 180) {
    windDirection.innerHTML = `South-East`;
  } else if (windDeg > 180 && windDeg < 270) {
    windDirection.innerHTML = `South-West`;
  } else if (windDeg > 270 && windDeg < 360) {
    windDirection.innerHTML = `North-West`;
  }

  farenheit.addEventListener("click", (event) => {
    event.preventDefault();
    inline.innerHTML = `${Math.floor((response.data.main.temp * 9) / 5 + 32)}℉`;
  });
  celcius.addEventListener("click", (event) => {
    event.preventDefault();
    inline.innerHTML = `${Math.round(response.data.main.temp)}℃`;
  });
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

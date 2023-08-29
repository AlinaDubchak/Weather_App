let day = document.querySelector(".day");
let time = document.querySelector(".time");
let farenheit = document.querySelector(".farenheit");
let celcius = document.querySelector(".celcius");
let inline = document.querySelector(".inline");
const selectElement = document.getElementById("locationSelect");
const selectedLocationSpan = document.getElementById("selectedLocation");
const searchButton = document.getElementById("searchButton");
let temperature = 22;
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
farenheit.addEventListener("click", (event) => {
  event.preventDefault();
  inline.innerHTML = `${Math.floor((temperature * 9) / 5 + 32)}℉`;
});
celcius.addEventListener("click", (event) => {
  event.preventDefault();
  inline.innerHTML = `${temperature}℃`;
});

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
searchButton.addEventListener("click", function () {
  const selectedIndex = selectElement.selectedIndex;
  if (selectedIndex > 0) {
    const selectedOption = selectElement.options[selectedIndex];
    const selectedText = selectedOption.text;

    selectedLocationSpan.textContent = selectedText;
  } else {
    selectedLocationSpan.textContent = "No location selected";
  }
});

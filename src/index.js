let apiKey = "691e78bcea9b645661efcf11aa0db366";
//functions

//get curreny city information
function updateCity(response) {
  let currentTempLoc = Math.round(response.data.main.temp);
  let tempConv = document.querySelector("#tempConvertId");
  tempConv.innerHTML = currentTempLoc;
  let currentCityLoc = response.data.name;
  let cityLocation = document.querySelector("#cityloc");
  cityLocation.innerHTML = currentCityLoc;
  let highTempLoc = Math.round(response.data.main.temp_max);
  let highTemp = document.querySelector("#high-temp");
  highTemp.innerHTML = highTempLoc;
  let lowTempLoc = Math.round(response.data.main.temp_min);
  let lowTemp = document.querySelector("#low-temp");
  lowTemp.innerHTML = lowTempLoc;
  let windSpeed = Math.round(response.data.wind.speed);
  let winds = document.querySelector("#wind-s");
  winds.innerHTML = windSpeed;
  let humidity = response.data.main.humidity;
  let humidper = document.querySelector("#humidity-per");
  humidper.innerHTML = humidity;
}
function getlocation(coordinatepos) {
  let currentDate = now.getDate();
  let currentMonth = months[now.getMonth()];
  let curretHour = now.getHours();
  let currentMin = now.getMinutes();
  if (currentMin < 10) {
    currentMin = "0" + currentMin;
  }
  if (curretHour > 12) {
    curretHour = curretHour - 12;
    currentMin = currentMin + " PM";
  } else {
    currentMin = currentMin + " AM";
  }
  let currentDateShown = document.querySelector("h3");
  let currentFiveForcast = document.querySelector("#forcastCurrent");
  //display the current date and time
  currentDateShown.innerHTML = `Today | ${currentDay}, ${currentMonth} ${currentDate} | ${curretHour}:${currentMin}`;
  currentFiveForcast.innerHTML = `${currentDay} | ${now.getMonth()}/${currentDate}`;

  let lat = coordinatepos.coords.latitude;
  let lon = coordinatepos.coords.longitude;
  let tempLocImperial = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
  axios.get(tempLocImperial).then(updateCity);
}
function updateToCurrentCity() {
  navigator.geolocation.getCurrentPosition(getlocation);
}

// update city from user
function citySearch(event) {
  event.preventDefault();
  let cityLocation = document.querySelector("#cityloc");
  let cityInput = document.querySelector("#city-input");
  cityLocation.innerHTML = cityInput.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(updateCity);
}

// convert to celcius when clicked
function fToC(event) {
  event.preventDefault();
  //let tempConv = document.querySelector("tempConvertId");
}
// convert to F when clicked
function cToF(event) {
  event.preventDefault();
  let tempConv = document.querySelector("#tempConvertId");
  tempConv.innerHTML = 0;
}

// variables
let now = new Date();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let currentDay = days[now.getDay()];
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
  "Dec"
];
//search engine, when searching for a city
let cityInput = document.querySelector("#city-search-form");
cityInput.addEventListener("submit", citySearch);

//convert celcius to F
let fahrenheitConv = document.querySelector("#f-conv");
fahrenheitConv.addEventListener("click", fToC);
let celsiusConv = document.querySelector("#c-conv");
celsiusConv.addEventListener("click", cToF);

//update to current city information
let currentCityButton = document.querySelector("#current-city");
currentCityButton.addEventListener("click", updateToCurrentCity);

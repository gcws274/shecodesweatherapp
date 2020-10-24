let apiKey = "691e78bcea9b645661efcf11aa0db366";
//functions
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
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
function formatHours(response){
  let date = new Date(response);
  let curretHour = date.getHours();
  let currentMin = date.getMinutes();
  if (currentMin < 10) {
    currentMin = "0" + currentMin;
  }
  if (curretHour > 12) {
    curretHour = curretHour - 12;
    currentMin = currentMin + " PM";
  } else {
    currentMin = currentMin + " AM";
  }
  return `${curretHour}:${currentMin}`;
}
function updateDateAndTime(timeDate){
  let date = new Date(timeDate);
  let day = days[date.getDay()];
  let currentDate = date.getDate();
  let month = months[date.getMonth()];
  let currentTime = formatHours(timeDate)
  let currentInfo = document.querySelector("#currentDisplay")
  currentInfo.innerHTML = `Today | ${day}, ${month} ${currentDate} | ${currentTime}`;
}
//get curreny city information
function updateCity(response) {
  let fahrenheiTemp = response.data.main.temp;
  let tempConv = document.querySelector("#tempConvertId");
  tempConv.innerHTML = Math.round(fahrenheiTemp);
  let currentCityLoc = response.data.name;
  console.log(response.data)
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
  let weatherDescription = document.querySelector("#current-desc")
  weatherDescription.innerHTML = response.data.weather[0].description;
  let iconWeather = document.querySelector("#weather-emoji");
  iconWeather.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconWeather.setAttribute("alt", response.data.weather[0].description);
  updateDateAndTime(response.data.dt*1000)
  }
//update five day forcast
function dispalyForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;
  for (let index = 0; index < 5; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
    <div class="col weatherForcastTime">
      <h4>
        ${formatHours(forecast.dt*1000)}
      </h4>
      <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"/>
      <div class="weatherForecast">
        <strong>High:${Math.round(forecast.main.temp_max)}&deg | </strong>
        Low:${Math.round(forecast.main.temp_min)}&deg
      </div>
    </div>
  `;
  }
}
// update city from user
function citySearch(event) {
  event.preventDefault();
  let cityLocation = document.querySelector("#cityloc");
  let cityInput = document.querySelector("#city-input");
  cityLocation.innerHTML = cityInput.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(updateCity);
  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityInput.value}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(dispalyForecast);
}
function getlocation(coordinatepos) {
  let lat = coordinatepos.coords.latitude;
  let lon = coordinatepos.coords.longitude;
  let tempLocImperial = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
  axios.get(tempLocImperial).then(updateCity);
}
function updateToCurrentCity() {
  navigator.geolocation.getCurrentPosition(getlocation);
}
function displayF(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let fahrenheiTemp = (celsiusTemp * (9/5)) + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemp);
}

function displayC(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  celsiusTemp = Math.abs((fahrenheiTemp - 32) * (5/9));
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}
//search engine, when searching for a city
let cityInput = document.querySelector("#city-search-form");
cityInput.addEventListener("submit", citySearch);

//update to current city information
let currentCityButton = document.querySelector("#current-city");
currentCityButton.addEventListener("click", updateToCurrentCity);
window.addEventListener('load', updateToCurrentCity)

let temperatureElement = document.querySelector("#tempConvertId");
let fahrenheiTemp= null;
let celsiusTemp =null;

let fahrenheitLink = document.querySelector("#f-conv");
fahrenheitLink.addEventListener("click", displayF);

let celsiusLink = document.querySelector("#c-conv");
celsiusLink.addEventListener("click", displayC);
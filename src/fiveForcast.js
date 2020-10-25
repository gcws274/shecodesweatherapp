let apiKey = "691e78bcea9b645661efcf11aa0db366";

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
function displayForecastDays(response) {
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
      <div id=" five-day-forecast forecast-days" class="row weekdays">
        <strong>High:${Math.round(forecast.main.temp_max)}&deg | </strong>
        Low:${Math.round(forecast.main.temp_min)}&deg
      </div>
    </div>
  `;
  }
}
function getlocation(coordinatepos) {
  let lat = coordinatepos.coords.latitude;
  let lon = coordinatepos.coords.longitude;
  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityInput.value}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecastDays);
}
function updateToCurrentCity() {
  navigator.geolocation.getCurrentPosition(getlocation);
}
window.addEventListener('load', updateToCurrentCity)
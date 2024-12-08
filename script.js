const apiKey = "076398487e0b58513a793a04b0f82eaa";
const baseURL = "https://api.openweathermap.org/data/2.5/weather?";
const iconURL = "http://openweathermap.org/img/wn/";

function getWeatherData(cityName) {
  const url = `${baseURL}q=${cityName}&appid=${apiKey}&units=metric`;
  $.ajax({
    url: url,
    type: "GET",
    success: function (data) {
      displayWeatherData(data);
    },
    error: function (error) {
      console.log("Error", error);
      const errorText = ` <p class="error-message">Please insert a valid city name</p>`;
      $("#weatherResult").html(errorText);
    },
  });
}

function displayWeatherData(data) {
  const displayIcon = getWeatherIcon(data.weather[0].icon);
  const displayData = `
  <section class="weatherCondition">
  <img src="${displayIcon}"> 
  <p class="weather">${data.weather[0].main} </p>
  </section>
  <p class="temp">${data.main.temp}°C</p> 
  <p class="city">${data.name}</p`;
  $("#weatherResult").html(displayData);
}

function getWeatherIcon(iconCode) {
  return `${iconURL}${iconCode}@2x.png`;
}

$(document).ready(function () {
  $("#getWeatherBtn").click(function () {
    const cityName = $("#cityName").val();
    getWeatherData(cityName);
    $("#cityName").val("");
  });
});

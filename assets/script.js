// Set up my variables for each element.
var form = document.querySelector("form");
var forecastEl = document.querySelector(".forecast");
var tempEl = document.querySelector(".temp");
var humidEl = document.querySelector(".humid");
var windEl = document.querySelector(".wind");
var cityName = document.querySelector(".city-name");
var fiveDay = document.querySelector(".five-day");
var historyEl = document.querySelector(".history-search");
var searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || []
var clearEl = document.querySelector(".clear");
var containerEl = document.querySelector(".container");
var getDataBack = document.getElementById("")





// Created a function for the search history element in order to save the searches in the local storage.
function saveHistory(city) {
  console.log(city)
  
  searchHistory.push(city)
  console.log(searchHistory)
  localStorage.setItem("searchHistory", JSON.stringify(searchHistory))
  renderHistory();

}

// Created a function to render the history that will be saved.
function renderHistory() {
  historyEl.textContent = ""

  for (let i =0; i < searchHistory.length; i++) {
  var row = document.createElement("div")
  var button = document.createElement("button")
  button.setAttribute("class", "historyBtn")
  row.setAttribute("class", "col-2")
  button.textContent = searchHistory[i]
  historyEl.appendChild(button)
  // row.appendChild(button)

  }
}
$(".hisotryBtn").on("click",  function(){
  console.log("ok")
})

// This function is created to render the weather deatils the will be displayed on the page.

function renderWeather(data) {
  console.log(data)
  
  cityName.textContent = data.city.name
  tempEl.textContent = "temp: " + data.list[0].main.temp + " degrees"
  windEl.textContent = "wind: " + data.list[0].wind.speed + " MPH"
  humidEl.textContent = "humidity: " + data.list[0].main.humidity + "%"

// This function was created to display the 5 day weather cards as well as the icons.
}
function renderfiveDay(data) {
  for(let i =0; i< data.list.length; i++){
    var iconcode = data.list[i].weather[0].icon;
  var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
  }
  
  fiveDay.textContent = ""
  for (let i = 0; i < data.list.length; i = i + 8) {
    console.log(data.list[i])
    var html = ` <div class="card col-2"> 
    <div class="card-title">
        <h3>${data.list[i].dt_txt.split(" ")[0]}</h3>

    </div>

    <div class="card-body">
        <img src=${iconurl}>
        <p>Temp: ${data.list[i].main.temp}°</p>
        <p>wind: ${data.list[i].wind.speed} MPH</p>
        <p>humid: ${data.list[i].main.humidity} %</p>

    </div>
</div>`
fiveDay.insertAdjacentHTML("beforeend",html)
    
    
  }
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  
// Fetching the apis for the geographic data and the forecast of the locations.

  fetch("http://api.openweathermap.org/geo/1.0/direct?q=" + form.city.value + "&appid=0578539c9ba7ff6fc8e3f6f54cac232c")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      let lat = data[0].lat;
      let lon = data[0].lon;
      console.log(lat + ""+lon)
      fetch("http://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&appid=0578539c9ba7ff6fc8e3f6f54cac232c&units=imperial")
        .then(function(response){
          return response.json();
        })
        .then(function(data){
          renderWeather(data)
          renderfiveDay(data)
          saveHistory(form.city.value)
        });
    })
   .catch(function (error) {
    console.error(error);
   });
   

});




clearEl.addEventListener("click", function() {
  localStorage.removeItem("searchHistory");
  containerEl.innerHTML = "";
  searchHistory = [];

});


renderHistory();





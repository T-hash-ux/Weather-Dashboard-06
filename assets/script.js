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
var clearEl = document.getElementById(".clear");
var containerEl = document.getElementById(".container");
var getDataBack = document.getElementById("")




function saveHistory(city) {
  console.log(city)
  
  searchHistory.push(city)
  console.log(searchHistory)
  localStorage.setItem("searchHistory", JSON.stringify(searchHistory))
  renderHistory();

}


function renderHistory() {
  historyEl.textContent = ""

  for (let i =0; i < searchHistory.length; i++) {
  var row = document.createElement("div")
  var button = document.createElement("button")
  row.setAttribute("class", "col-2")
  button.textContent = searchHistory[i]
  historyEl.appendChild(row)
  row.appendChild(button)

  }
}





function renderWeather(data) {
  cityName.textContent = data.city.name
  tempEl.textContent = "temp: " + data.list[0].main.temp + " degrees"
  windEl.textContent = "wind: " + data.list[0].wind.speed + " MPH"
  humidEl.textContent = "humidity: " + data.list[0].main.humidity + "%"


}
function renderfiveDay(data) {
  fiveDay.textContent = ""
  for (let i = 0; i < data.list.length; i = i + 8) {
    console.log(data.list[i])
    var html = ` <div class="card col-2"> 
    <div class="card-title">
        <h3>${data.list[i].dt_txt.split(" ")[0]}</h3>

    </div>

    <div class="card-body">
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




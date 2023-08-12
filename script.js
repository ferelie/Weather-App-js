const apiKey = "215c0036caaf46841cc57d84ef70ee23";
const searchButton = document.getElementById("searchButton");
const cityInput = document.getElementById("searchBar");
const weatherContainer = document.getElementById("weather-contaniner");

async function getWeatherData() {
  const cityName = cityInput.value.trim();

  if (cityName) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
      );
      const data = await response.json();

      const weatherInfo = `
                  <h2>Weather now in ${data.name}</h2>
                  <p>Temperature: ${data.main.temp} °C</p>
                  <p>Weather: ${data.weather[0].description}</p>
                  <p>Humidity: ${data.main.humidity}%</p>
              `;
      weatherContainer.innerHTML = weatherInfo;
      cityInput.value = "";
    } catch (error) {
      console.error("Error fetching weather data:", error);
      weatherContainer.innerHTML = "<p>Error fetching weather data.</p>";
    }
  }
}

searchButton.addEventListener("click", getWeatherData);

cityInput.addEventListener("keydown", (event) => {
  event.key === "Enter" ? (event.preventDefault(), searchButton.click()) : null;
});

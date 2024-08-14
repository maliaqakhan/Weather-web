const inputBox = document.querySelector(".input-box");
const searchBtn = document.getElementById("searchButton");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");
const humidity = document.getElementById("humidity");
const wind_speed = document.getElementById("wind-speed");
const weatherImage = document.querySelector(".weather-image");

async function checkWeather(city) {
  const api_key = "72b01a5ed6a57040e8af748179cd04d2"; // Replace with your actual API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

  try {
    const response = await fetch(url);
    const weatherData = await response.json();
    temperature.innerHTML = `${Math.round(weatherData.main.temp - 273.15)} <sup>°C</sup>`;
    description.innerHTML = weatherData.weather[0].description;
    humidity.innerHTML = `${weatherData.main.humidity}%`;
    wind_speed.innerHTML = `${weatherData.wind.speed} Km/H`;

    switch (weatherData.weather[0].main.toLowerCase()) {
      case 'clouds':
        weather_display.innerHTML = "images/cloudy.png";
        break;
      case 'clear':
        weatherImage.src = "images/sun.png";
        break;
      case 'rain':
        weatherImage.src = "images/rain.png";
        break;
      case 'mist':
        weatherImage.src = "images/mist.png";
        break;
      case 'snow':
        weatherImage.src = "images/snow.png";
        break;
      default:
        // If the weather condition is not recognized, you can set a default image
        weatherImage.src = "images/default.png";
    }
  } catch (error) {
    console.log("Error fetching weather data:", error);
  }
}

if (searchBtn) {
  searchBtn.addEventListener('click', () => {
    checkWeather(inputBox.value); 
  });
}

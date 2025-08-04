const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const errorDisplay = document.getElementById('errorDisplay');

searchButton.addEventListener('click', () => {
    const location = locationInput.value.trim();
    if (location) {
        fetchWeather(location);
    } else {
        errorDisplay.textContent = 'Please enter a city name.';
        errorDisplay.style.display = 'block';
        clearWeatherData();
    }
});

function fetchWeather(location) {
    const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`; // units=metric for Celsius

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            displayWeatherData(data);
            errorDisplay.style.display = 'none'; // Hide error if successful
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            errorDisplay.textContent = 'City not found or API error. Please try again.';
            errorDisplay.style.display = 'block';
            clearWeatherData();
        });
}

function displayWeatherData(data) {
    locationElement.textContent = data.name;
    temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
    descriptionElement.textContent = data.weather[0].description;
}

function clearWeatherData() {
    locationElement.textContent = '';
    temperatureElement.textContent = '';
    descriptionElement.textContent = '';
}

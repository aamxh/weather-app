const apiKey = 'c3793268dfdd49288c78b7dd9abd83f2';
const form = document.querySelector('.weather-form');
const cityInput = document.querySelector('.city-input');
const card = document.querySelector('.weather-card');

form.addEventListener('submit', async event => {
   event.preventDefault();
   const city = cityInput.value;
   if (city) {
    try {
        const weatherData = await getWeather(city);
        displayWeather(weatherData);
    } catch(ex) {
        console.error(ex);
        displayError(ex);
    }
   } else {
    displayError('Please enter a city!');
   }
});

async function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(url);
    if(!response.ok) {
        throw new Error('Could not fetch weather data!');
    }
    return await response.json();
}

function displayWeather(data) {
    const {name: city, main: {temp, humidity}, weather:[{description, id}]} = data;
    card.textContent = '';
    const cityDisplay = document.createElement('h1');
    const tempDisplay = document.createElement('p');
    const humidityDisplay = document.createElement('p');
    const descDisplay = document.createElement('p');
    const emojiDisplay = document.createElement('p');
    cityDisplay.textContent = city;
    tempDisplay.textContent = `${Math.round(Number(temp)) - 273}° C`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;
    emojiDisplay.textContent = getEmojiFromId(id);
    cityDisplay.classList.add('city');
    tempDisplay.classList.add('temp');
    humidityDisplay.classList.add('humidity');
    descDisplay.classList.add('desc');
    emojiDisplay.classList.add('emoji');
    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(emojiDisplay);
}

function getEmojiFromId(id) {
    if(id >= 200 && id < 300) return '⛈️';
    else if (id >=300 && id < 400) return '🌧️';
    else if (id >= 500 && id < 600) return '🌨️';
    else if (id >= 600 && id < 700) return '❄️';
    else if (id >= 700 && id < 800) return '🍃';
    else if (id == 800) return '🌞';
    else if (id >= 801 && id < 810) return '☁️';
    else return '❓';
}

function displayError(message) {
    const errorDisplay = document.createElement('p');
    errorDisplay.textContent = message; 
    errorDisplay.classList.add('.error');
    card.textContent = '';
    card.appendChild(errorDisplay);
}
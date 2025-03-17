import axios from 'axios';

const apiKey = 'a98e9c2a6bmsh116b940f62d777ep1e5b63jsn838fa5291632'; // Replace with your new API key
const host = 'weatherapi-com.p.rapidapi.com';

export const fetchCurrentWeather = async (city) => {
  try {
    const response = await axios.get(`https://${host}/current.json`, {
      params: {
        q: city,
      },
      headers: {
        'x-rapidapi-key': apiKey,
        'x-rapidapi-host': host,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching current weather:', error);
    return null;
  }
};

export const fetchForecastWeather = async (city) => {
  try {
    const response = await axios.get(`https://${host}/forecast.json`, {
      params: {
        q: city,
        days: 3,
      },
      headers: {
        'x-rapidapi-key': apiKey,
        'x-rapidapi-host': host,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching forecast weather:', error);
    return null;
  }
};

// New function to fetch historical weather data
export const fetchHistoricalWeather = async (city, date) => {
  try {
    const response = await axios.get(`https://${host}/history.json`, {
      params: {
        q: city,
        dt: date,
      },
      headers: {
        'x-rapidapi-key': apiKey,
        'x-rapidapi-host': host,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching historical weather:', error);
    return null;
  }
};

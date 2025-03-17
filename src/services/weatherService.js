import axios from 'axios';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = process.env.REACT_APP_WEATHER_API_URL;

export const fetchWeatherData = async (city) => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric'
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
};

export const fetchHistoricalWeather = async (lat, lon) => {
  try {
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const oneDay = 86400; // Seconds in a day

    const promises = [];
    for (let i = 1; i <= 5; i++) {
      const timestamp = currentTimestamp - i * oneDay;
      const url = `${BASE_URL}/onecall/timemachine`;
      promises.push(
        axios.get(url, {
          params: {
            lat,
            lon,
            dt: timestamp,
            appid: API_KEY,
            units: 'metric'
          },
        })
      );
    }

    const responses = await Promise.all(promises);
    return responses.map(response => response.data);
  } catch (error) {
    console.error("Error fetching historical weather data:", error);
    return [];
  }
};

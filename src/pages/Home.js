import React, { useState, useEffect } from 'react';
import WeatherCard from '../components/WeatherCard';
import { fetchWeatherData } from '../services/weatherService';
import { getRandomCities } from '../utils/getRandomCities';

const Home = () => {
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    const loadWeatherData = async () => {
      const cities = getRandomCities(3);
      const data = await Promise.all(cities.map(city => fetchWeatherData(city)));
      setWeatherData(data.filter(item => item !== null));
    };

    loadWeatherData();
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', padding: '20px',}}>
      {weatherData.map((data, index) => (
        <WeatherCard
          key={index}
          city={data.name}
          temperature={data.main.temp}
          description={data.weather[0].description}
          icon={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          date={new Date().toDateString()}
          feelsLike={data.main.feels_like}
          humidity={data.main.humidity}
          precipitation={data.rain ? data.rain['1h'] : 0} 
          low={data.main.temp_min}
          high={data.main.temp_max}
        />
      ))}
    </div>
  );
};

export default Home;

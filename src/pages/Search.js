import React, { useState } from 'react';
import WeatherCard from '../components/WeatherCard';
import SearchBar from '../components/SearchBar';
import {
  fetchCurrentWeather,
  fetchForecastWeather,
  fetchHistoricalWeather,
} from '../services/rapidWeatherService';
import './Search.css';

// Helper function to get a date in the past
const getPastDate = (daysAgo) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString().split('T')[0];
};

// Helper function to format dates
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toDateString();
};

const Search = () => {
  const [allDaysData, setAllDaysData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Function to handle the search
  const handleSearch = async (city) => {
    setLoading(true);
    setError(null); // Clear any previous error
    try {
      const combinedData = [];

      // Fetch current weather data
      const currentData = await fetchCurrentWeather(city);
      if (!currentData) throw new Error('Unable to fetch current weather data');

      // Add today's weather to the combined data
      combinedData.push({
        date: new Date().toISOString().split('T')[0], // Today's date
        city: currentData.location.name,
        temperature: currentData.current.temp_c,
        description: currentData.current.condition.text,
        icon: `https:${currentData.current.condition.icon}`,
        feelsLike: currentData.current.feelslike_c,
        humidity: currentData.current.humidity,
        precipitation: currentData.current.precip_mm,
        low: currentData.current.temp_c - 2,
        high: currentData.current.temp_c + 2,
      });

      // Fetch historical weather data (past 3 days)
      for (let i = 3; i >= 1; i--) {
        const date = getPastDate(i);
        const history = await fetchHistoricalWeather(city, date);
        if (history && history.forecast && history.forecast.forecastday) {
          const data = history.forecast.forecastday[0];
          combinedData.push({
            date: data.date,
            city: currentData.location.name,
            temperature: data.day.avgtemp_c,
            description: data.day.condition.text,
            icon: `https:${data.day.condition.icon}`,
            feelsLike: data.day.avgtemp_c,
            humidity: data.day.avghumidity,
            precipitation: data.day.totalprecip_mm,
            low: data.day.mintemp_c,
            high: data.day.maxtemp_c,
          });
        }
      }

      // Fetch forecast weather data (next 3 days)
      const forecast = await fetchForecastWeather(city);
      if (!forecast || !forecast.forecast || !forecast.forecast.forecastday) {
        throw new Error('Unable to fetch forecast data');
      }
      forecast.forecast.forecastday.forEach((data) => {
        combinedData.push({
          date: data.date,
          city: currentData.location.name,
          temperature: data.day.avgtemp_c,
          description: data.day.condition.text,
          icon: `https:${data.day.condition.icon}`,
          feelsLike: data.day.avgtemp_c,
          humidity: data.day.avghumidity,
          precipitation: data.day.totalprecip_mm,
          low: data.day.mintemp_c,
          high: data.day.maxtemp_c,
        });
      });

      // Sort combined data by date (chronological order)
      combinedData.sort((a, b) => new Date(a.date) - new Date(b.date));

      // Set the combined and sorted data to the state
      setAllDaysData(combinedData);
    } catch (err) {
      console.error('Error during search:', err.message);
      setError(`Failed to fetch weather data for "${city}". Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-container">
      <SearchBar onSearch={handleSearch} />
      {loading && <p className="loading">Fetching weather data...</p>}
      {error && <p className="error">{error}</p>}
      {allDaysData.length > 0 && (
        <div className="forecast-container">
          {allDaysData.map((data, index) => (
            <WeatherCard
              key={index}
              city={data.city}
              temperature={data.temperature}
              description={data.description}
              icon={data.icon}
              date={formatDate(data.date)}
              feelsLike={data.feelsLike}
              humidity={data.humidity}
              precipitation={data.precipitation}
              low={data.low}
              high={data.high}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;

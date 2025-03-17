import React from 'react';
import './WeatherCard.css';

const WeatherCard = ({ city, temperature, description, icon, date, feelsLike, humidity, precipitation, low, high }) => {
  return (
    <div className="weather-card">
      <h2 className="weather-city">{city}</h2>
      <p className="weather-date">{date}</p>
      <img className="weather-icon" src={icon} alt={description} />
      <p className="weather-temp">{temperature}°C</p>
      <p className="weather-desc">{description}</p>
      {low !== undefined && high !== undefined && (
        <p className="weather-range">Low/High: {low}° / {high}°</p>
      )}
      {feelsLike !== undefined && (
        <p className="weather-feels">Feels Like: {feelsLike}°</p>
      )}
      {humidity !== undefined && (
        <p className="weather-humidity">Humidity: {humidity}%</p>
      )}
      {precipitation !== undefined && (
        <p className="weather-precip">Precipitation: {precipitation}%</p>
      )}
    </div>
  );
};

export default WeatherCard;

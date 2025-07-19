import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useDebounce from '../custom-hook/useDebounce';
import { useTheme } from './useTheme';

const WeatherCard = () => {
  const [city, setCity] = useState('delhi');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const debouncedCity = useDebounce(city, 1000);

  const { theme, toggleTheme } = useTheme();

  const API_Key = 'c068a05db35a84c253c11b3c61a6acd0';

  const fetchWeather = async (cityName) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_Key}`
      );
      setWeather(res.data);
    } catch (error) {
      console.log('Error fetching weather:', error);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (debouncedCity !== '') {
      fetchWeather(debouncedCity);
    }
  }, [debouncedCity]);

  return (
    <div className={`container ${theme === 'light' ? 'bg-light text-dark' : 'bg-dark text-light'}`}>

      

      <div className={`card shadow p-4 rounded-4  ${theme === 'light' ? 'bg-light text-dark' : 'bg-dark text-light'}`} style={{ maxWidth: '400px', margin: '0 auto' }}>
        <button className='btn btn-primary mb-3' onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>
        <h3 className='mb-3'>Weather Information</h3>

        <input
          className='form-control mb-2'
          placeholder='Enter a City'
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        {loading && (
          <div className='d-flex justify-content-center'>
            <div className='spinner-border text-primary' role='status'>
              <span className='visually-hidden'>Loading...</span>
            </div>
          </div>
        )}

        {weather ? (
          <div>
            <h5>{weather.name}</h5>
            <p>🌡 Temp: {weather.main.temp} °C</p>
            <p>🌥 Condition: {weather.weather[0].description}</p>
          </div>
        ) : !loading ? (
          <p>No data found.</p>
        ) : null}
      </div>
    </div>
  );
};

export default WeatherCard;

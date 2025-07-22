import React, { useEffect, useState } from 'react'
import useDebounce from '../custom-Hook/useDebounce';


const Weather = () => {
    const [city, setCity] = useState('');
    const [showWeather, setShowWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const debouncedValue = useDebounce(city, 1000);


    const API_Key = 'fe2f09ee4549eef15a86604ba23a53bc';

    const fetchWeather = async (cityName) => {
        if (!cityName) return;
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_Key}`
            );

            if (!response.ok) {
                throw new Error('City not found or API error');
            }

            const data = await response.json();
            setShowWeather(data);
            console.log(data, 'API Fetch');
        } catch (err) {
            console.error('Error while fetching:', err);
            setError('City not found or API issue');
        } finally {
            setLoading(false);
        }
    };

    const fetchWeatherByCoords = async (lat, lon) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_Key}`
            );

            if (!response.ok) {
                throw new Error('Weather fetch error');
            }

            const data = await response.json();
            setShowWeather(data);
            console.log('Auto-location data:', data);
        } catch (err) {
            console.error('Coords fetch error:', err);
            setError('Could not fetch weather for your location');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (debouncedValue !== '') {
            fetchWeather(debouncedValue);
        }
    }, [debouncedValue]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                fetchWeatherByCoords(latitude, longitude);
            },
            (err) => {
                console.error('Geolocation Error:', err);
                setError('Location access denied');
            }
        )
    }, []);

    return (
        <div className='container d-flex flex-column align-items-center justify-content-center h-100 mb-4'>
            <h2 className='fw-bold mb-2'>Weather App</h2>
            <input
                disabled = {loading}
                className='form-control mb-2 w-75'
                type='text'
                placeholder='Enter the City..'
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />

            {loading &&
                <div className='d-flex justify-content-center'>
                    <div className='spinner-border text-primary' role='status'>
                        <span className='visually-hidden'>Loading...</span>
                    </div>
                </div>
            }

            {!loading && error && !showWeather && <p style={{ color: 'red' }} className='fw-bold'>Error while Showing</p>}

            {showWeather && !loading &&
                <div className='d-flex card shadow-sm rounded p-3 mt-2 justify-content-center w-75'>
                    <img className='card-img-top  mx-auto' src={`https://openweathermap.org/img/wn/${showWeather.weather[0].icon}@2x.png`} alt='icon'
                        style={{ maxWidth: '100px', objectFit: 'cover' }} />
                    <h2 className='card-title mx-auto'>{showWeather.name}</h2>
                    <div className='card-body mx-auto'>
                        <p>🌡 Temp: {showWeather.main.temp} °C</p>
                        <p>🌥 Condition: {showWeather.weather[0].description}</p>
                    </div>
                </div>
            }

            {showWeather && city === '' && !error && (
                <p className='text-muted mt-1'>Showing weather for your current location.</p>
            )}


        </div>
    )
}

export default Weather
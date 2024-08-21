import { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import ErrorAlert from './components/ErrorAlert';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [useCurrentLocation, setUseCurrentLocation] = useState(true); 

  const fetchWeatherByCity = async () => {
    setLoading(true);
    setError(null);
    setWeatherData(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid={appid}`
      );
      const data = await response.json();

      if (response.ok) {
        setWeatherData(data);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Failed to fetch data');
    }
    setLoading(false);
  };

  const fetchWeatherByCoords = async (latitude, longitude) => {
    setLoading(true);
    setError(null);
    setWeatherData(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid={appid}`
      );
      const data = await response.json();

      if (response.ok) {
        setWeatherData(data);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Failed to fetch data');
    }
    setLoading(false);
  };

  useEffect(() => {
    if (useCurrentLocation) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            fetchWeatherByCoords(latitude, longitude);
          },
          (error) => {
            setError('Unable to retrieve your location');
            setUseCurrentLocation(false);
          }
        );
      } else {
        setError('Geolocation is not supported by your browser');
        setUseCurrentLocation(false);
      }
    }
  }, [useCurrentLocation]);

  const handleSearchClick = () => {
    if (city) {
      setUseCurrentLocation(false); 
      fetchWeatherByCity();
    }
  };

  return (
    <div className="main-container h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-r from-blue-500 to-indigo-500">
      <SearchBar 
        city={city} 
        handleChange={(e) => setCity(e.target.value)} 
        handleClick={handleSearchClick} 
        getCurrentLocation={() => setUseCurrentLocation(true)} 
        loading={loading} 
      />

      {loading && <LoadingSpinner />}

      {error && <ErrorAlert error={error} />}

      {weatherData && !loading && !error && (
        <WeatherCard weatherData={weatherData} />
      )}
    </div>
  );
}

export default App;

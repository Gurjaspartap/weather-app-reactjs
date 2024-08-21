import React from 'react';
import dayjs from 'dayjs'; // For formatting date and time

function WeatherCard({ weatherData }) {
  const {
    main: { temp, feels_like, humidity },
    weather: [{ description, icon }],
    wind: { speed },
    sys: { sunrise, sunset },
    name
  } = weatherData;

  // Convert temperatures from Kelvin to Celsius
  const kelvinToCelsius = (temp) => (temp - 273.15).toFixed(1);
  
  // Format sunrise and sunset times
  const formatTime = (timestamp) => dayjs.unix(timestamp).format('h:mm A');

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-1/2 w-1/3 mx-auto mt-6 text-center border border-gray-200">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">{name}</h1>
      <img
        src={`http://openweathermap.org/img/wn/${icon}.png`}
        alt={description}
        className="mx-auto mb-3 w-24 h-24"
      />
      <p className="text-4xl font-semibold text-gray-900 mb-1">
        {kelvinToCelsius(temp)}°C
      </p>
      <p className="text-lg text-gray-700 mb-2">
        Feels like {kelvinToCelsius(feels_like)}°C
      </p>
      <p className="text-md text-gray-600 mb-4 capitalize">
        {description}
      </p>
      <div className="flex justify-around mb-4">
        <div className="flex flex-col items-center">
          <p className="text-sm text-gray-500">Humidity</p>
          <p className="text-lg font-semibold text-gray-800">{humidity}%</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-sm text-gray-500">Wind Speed</p>
          <p className="text-lg font-semibold text-gray-800">{speed} m/s</p>
        </div>
      </div>
      <div className="flex justify-around text-sm text-gray-600">
        <div>
          <p className="font-semibold">Sunrise</p>
          <p>{formatTime(sunrise)}</p>
        </div>
        <div>
          <p className="font-semibold">Sunset</p>
          <p>{formatTime(sunset)}</p>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;

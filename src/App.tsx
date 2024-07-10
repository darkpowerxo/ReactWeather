import React, { useState, KeyboardEvent } from 'react';
import axios from 'axios';
import CurrentWeather from './components/currentWeather/currentWeather';
import Forecast from './components/forecast/forecast';
import './App.css';
import WeatherData from "./interfaces/WeatherData";

const App: React.FC = () => {
  const url = process.env.REACT_APP_WEATHER_URL;
  const api_key = process.env.REACT_APP_WEATHER_API_KEY;

  const [Location, setLocation] = useState<string>('');
  const [WeatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [ShowWeather, setShowWeather] = useState<boolean>(false);
  const [ForecastData, setForecastData] = useState<WeatherData | null>(null);
  const [showForecast, setShowForecast] = useState<boolean>(false);

  const weather_request = `${url}weather?q=${Location}&units=metric&appid=${api_key}`;
  const forecast_request = `${url}forecast?q=${Location}&units=metric&appid=${api_key}`;

  const searchLocation = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      axios.get(weather_request).then((response) => {
        setWeatherData(response.data);
      });
      setShowWeather(true);
    }
  };

  const getForecast = () => {
    axios.get(forecast_request).then((response) => {
      setForecastData(response.data);
    });
    setShowForecast(true);
  };

  return (
    <div className="app">
      <div className="container">
        <div className="search">
          <input
            type="text"
            value={Location}
            className="searchBox"
            onChange={(event) => setLocation(event.target.value)}
            placeholder="Enter Location"
            onKeyDown={searchLocation}
          />
          {WeatherData ? (
            <button className="getForecast" type="button" onClick={getForecast}>
              Get forecast
            </button>
          ) : null}
        </div>
        {ShowWeather && WeatherData && <CurrentWeather data={WeatherData} />}
        {showForecast && ForecastData && <Forecast data={ForecastData} />}
      </div>
    </div>
  );
};

export default App;

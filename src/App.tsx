import React, { useState } from 'react';
import axios from 'axios';
import CurrentWeather from "./components/currentWeather/currentWeather";
import Forecast from "./components/forecast/forecast";
import './App.css';

const url = process.env.REACT_APP_WEATHER_URL;
const api_key = process.env.REACT_APP_WEATHER_API_KEY;

const weather_request= `${url}weather?q=${Location}&units=metric&appid=${api_key}`;
const forecast_request= `${url}forecast?q=${Location}&units=metric&appid=${api_key}`;

function App() {

  const[Location,setLocation]=useState('');
  const[WeatherData,setWeatherData]= useState(null);
  const[ShowWeather, setShowWeather] = useState(false);
  const[ForecastData,setForecastData]= useState(null);
  const[showForecast, setShowForecast] = useState(false);
  
  const searchLocation = (event: { key: string; }) => {
    if (event.key === 'Enter') {
      axios.get(weather_request)
      .then((response) => {
        setWeatherData(response.data);
      });
      setShowWeather(true);
    }
  }

  const getForecast = () => {
    axios.get(forecast_request)
        .then((response) => {
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
          onChange={event=> setLocation(event.target.value)}
          placeholder='Enter Location'
          onKeyDown={searchLocation}
          />
          {WeatherData ?
          <button className="getForecast" type="button" onClick={getForecast}>Get forecast</button>  
          : null}
      </div>
      {ShowWeather && WeatherData && <CurrentWeather data={WeatherData} />}
      {showForecast && ForecastData && <Forecast data={ForecastData} />}
    </div>
  </div>
  );
}

export default App;

// ForecastCard.jsx
import React, { useEffect, useState } from "react";
import "./ForecastCard.css";
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";

const iconMap = {
  "01d": clear_icon,
  "01n": clear_icon,
  "02d": cloud_icon,
  "02n": cloud_icon,
  "03d": cloud_icon,
  "03n": cloud_icon,
  "04d": drizzle_icon,
  "04n": drizzle_icon,
  "09d": rain_icon,
  "09n": rain_icon,
  "10d": rain_icon,
  "10n": rain_icon,
  "13d": snow_icon,
  "13n": snow_icon,
};

const ForecastCard = ({ cityName }) => {
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    const fetchForecast = async () => {
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      const res = await fetch(url);
      const data = await res.json();

      const dailyForecast = data.list.filter((item) =>
        item.dt_txt.includes("12:00:00")
      ).slice(0, 3);

      setForecast(dailyForecast);
    };

    if (cityName) {
      fetchForecast();
    }
  }, [cityName]);

  return (
    <div className="forecast-container">
      <h4>Forecast for 3 days</h4>
      <div className="forecast-list">
        {forecast.map((item, index) => (
          <div key={index} className="forecast-card">
            <p>{new Date(item.dt_txt).toLocaleDateString()}</p>
            <img src={iconMap[item.weather[0].icon] || clear_icon} alt="icon" />
            <p>{Math.round(item.main.temp)}°C</p>
            <p>{item.weather[0].description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastCard;

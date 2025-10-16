import React, { useState, useEffect } from "react";
import WeatherCard from "./WeatherCard";
import "./WeatherList.css";

const WeatherList = () => {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);

    // Генерация случайных ID
    const getRandomCityId = () => Math.floor(Math.random() * 8000000) + 100000;

    // Основная функция загрузки погоды
    const loadWeather = async () => {
      setLoading(true);
        let foundCity = null;
        let attempts = 0;

      while (!foundCity && attempts < 50) {
        const id = getRandomCityId();
        try {
          const url = `https://api.openweathermap.org/data/2.5/weather?id=${id}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
          const response = await fetch(url);
          const data = await response.json();

          if (response.ok && data.name) {
            foundCity = data;
          }
        } catch (error) {
          console.error("Ошибка при запросе города:", error);
        }
        attempts++;
      }

      if (foundCity) {
        console.log(`Город найден после ${attempts} попыток: ${foundCity.name}`);
        setWeather(foundCity);
      } else {
        console.warn("Не удалось найти реальный город.");
        setWeather(null);
      }

      setLoading(false);
    };

    useEffect(() => {
      loadWeather();
    }, []);

    return (
      <div className="weather-list">
        <h2 className="title">Weather in Random Location</h2>
        <button className="load-btn" onClick={loadWeather} disabled={loading}>
          {loading ? "Loading..." : "Reload Location"}
        </button>

        <div className="cards-row">
          {!loading && !weather && (
            <p style={{ textAlign: "center" }}>No valid location found, try again!</p>
          )}
          {weather && <WeatherCard cityData={weather} />}
        </div>
      </div>
    );
};

export default WeatherList;

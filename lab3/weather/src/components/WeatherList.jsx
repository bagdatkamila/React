import React, { useState, useEffect } from "react";
import WeatherCard from "./WeatherCard";
import "./WeatherList.css";

const WeatherList = () => {
  const [weatherList, setWeatherList] = useState([]);
  const [loading, setLoading] = useState(false);

  const getRandomCityIds = (count) => {
    const ids = [];
    for (let i = 0; i < count; i++) {
        const id = Math.floor(Math.random() * 8000000) + 100000;
        ids.push(id);
    }
    return ids;
  };

  const loadWeather = async () => {
    setLoading(true);
    const results = [];
    const randomIds = getRandomCityIds(15); // пробуем 15 чтобы поймать хотя бы 4–5 реальных

    for (const id of randomIds) {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?id=${id}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
            const response = await fetch(url);
            const data = await response.json();

            // если город найден
            if (response.ok && data.name) {
            results.push(data);
            }
        } catch (error) {
            console.error("Error fetching weather for ID:", id, error);
        }
    }

    setWeatherList(results);
    setLoading(false);
  };

  useEffect(() => {
    loadWeather();
  }, []);

  return (
    <div className="weather-list">
        <h2 className="title">Weather in Random Locations</h2>
        <button className="load-btn" onClick={loadWeather}>
            {loading ? "Loading..." : "Reload Locations"}
        </button>

        <div className="cards-row">
            {weatherList.length === 0 && !loading && (
            <p style={{ textAlign: "center" }}>No valid locations found, try again!</p>
            )}
            {weatherList.map((data) => (
            <WeatherCard key={data.id} cityData={data} />
            ))}
        </div>
    </div>
  );
};

export default WeatherList;
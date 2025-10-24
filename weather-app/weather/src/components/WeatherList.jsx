import React, { useEffect, useState } from "react";
import WeatherCard from "./WeatherCard";
import "./WeatherList.css";

const getRandomCityId = () => Math.floor(Math.random() * 8000000) + 100000;

const WeatherList = () => {
  const [citiesData, setCitiesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  const loadRandomCities = async (count = 5) => {
    setLoading(true);
    const results = [];
    let attempts = 0;

    while (results.length < count && attempts < count * 20) {
      const id = getRandomCityId();
      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?id=${id}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok && data.name) {
          results.push(data);
        }
      } catch (error) {
        console.error("Error in city respponse", error);
      }
      attempts++;
    }

    setCitiesData(results);
    setLoading(false);
    setSearchResult(null); // сбрасываем результат поиска
  };

  useEffect(() => {
    loadRandomCities();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const searchCityByName = async () => {
    const city = searchTerm.trim();
    if (city === "") {
      alert("Enter city name");
      return;
    }

    setLoading(true);
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok && data.name) {
        setSearchResult(data);
      } else {
        alert("City not found");
        setSearchResult(null);
      }
    } catch (error) {
      console.error("Error in search", error);
      alert("Error in search");
    }
    setLoading(false);
  };

  return (
    <div className="weather-list-container">
      <h2>Cities</h2>

      <input
        type="text"
        placeholder="Enter city name..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-input"
      />

      <div className="button-group">
        <button onClick={searchCityByName} disabled={loading} className="refresh-button">
          Find the city
        </button>
        <button onClick={() => loadRandomCities()} disabled={loading} className="refresh-button">
          {loading ? "Loading..." : "Update cities"}
        </button>
      </div>

      <div className="weather-list">
        {searchResult ? (
          <WeatherCard cityData={searchResult} />
        ) : citiesData.length > 0 ? (
          citiesData.map((cityData, index) => (
            <WeatherCard key={index} cityData={cityData} />
          ))
        ) : (
          <p>Cities not found</p>
        )}
      </div>
    </div>
  );
};

export default WeatherList;

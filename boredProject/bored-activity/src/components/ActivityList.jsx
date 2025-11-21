import React, { useEffect, useState } from "react";
import ActivityCard from "./ActivityCard";
import "./ActivityList.css";

const ActivityList = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);

  // Загружает одно случайное занятие
  const fetchRandomActivity = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://bored-api.appbrewery.com/random");
      const data = await res.json();
      setActivities([data]); // API возвращает 1 объект, делаем массив
    } catch (error) {
      console.error("Ошибка при загрузке активности:", error);
    } finally {
      setLoading(false);
    }
  };

  // При загрузке страницы — получаем первую активность
  useEffect(() => {
    fetchRandomActivity();
  }, []);

  return (
    <div className="activity-list">
      <h1 className="title">🎲 Bored? Get a Random Activity!</h1>

      <button onClick={fetchRandomActivity} className="refresh-btn">
        New Activity
      </button>

      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        <div className="card-container">
          {activities.map((item, index) => (
            <ActivityCard key={index} {...item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ActivityList;

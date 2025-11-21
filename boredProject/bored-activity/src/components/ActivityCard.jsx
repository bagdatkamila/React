import React from "react";
import "./ActivityCard.css";

const ActivityCard = ({ activity, type, participants, price, accessibility }) => {
  // Преобразуем цену (0–1) в текст
  const getPriceLabel = (value) => {
    if (value === 0) return "Free";
    if (value <= 0.3) return "Low";
    if (value <= 0.6) return "Medium";
    return "High";
  };

  return (
    <div className="activity-card">
      <h2 className="activity-title">{activity}</h2>
      <div className="activity-info">
        <p><strong>Type:</strong> {type}</p>
        <p><strong>Participants:</strong> {participants}</p>
        <p><strong>Price:</strong> {getPriceLabel(price)}</p>
        {accessibility && (
          <p><strong>Accessibility:</strong> {accessibility}</p>
        )}
      </div>
    </div>
  );
};

export default ActivityCard;

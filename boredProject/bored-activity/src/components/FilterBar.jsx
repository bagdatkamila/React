import React, { useState } from "react";
import "./FilterBar.css";

const FilterBar = ({ setFilters, fetchActivity }) => {
  const [type, setType] = useState("");
  const [participants, setParticipants] = useState("");

  const handleSearch = () => {
    setFilters({ type, participants });
    fetchActivity();
  };

  const handleRandom = () => {
    setFilters({ type: "", participants: "" });
    fetchActivity();
  };

  return (
    <div className="filter-bar">
      <input
        type="text"
        placeholder="Type (e.g. education, recreational)"
        value={type}
        onChange={(e) => setType(e.target.value)}
      />
      <input
        type="number"
        placeholder="Participants"
        value={participants}
        onChange={(e) => setParticipants(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <button onClick={handleRandom}>Random</button>
    </div>
  );
};

export default FilterBar;

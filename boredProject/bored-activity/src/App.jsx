import React, { useState, useEffect } from "react";
import FilterBar from "./components/FilterBar";
import ActivityList from "./components/ActivityList";
import "./App.css";

const App = () => {
  const [activities, setActivities] = useState([]);
  const [filters, setFilters] = useState({ type: "", participants: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchActivity = async () => {
    setLoading(true);
    setError("");
    setActivities([]);

    let url = "https://www.boredapi.com/api/activity/";
    const params = new URLSearchParams();

    if (filters.type) params.append("type", filters.type);
    if (filters.participants) params.append("participants", filters.participants);

    if (params.toString()) url += `?${params.toString()}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.error) {
        setError("No activities found for your filters 😕");
      } else {
        setActivities([data]);
      }
    } catch {
      setError("Failed to fetch data. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivity();
  }, []);

  return (
    <div className="app">
      <h1>🎯 Not Bored Anymore</h1>
      <FilterBar setFilters={setFilters} fetchActivity={fetchActivity} />
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}
      <ActivityList activities={activities} />
    </div>
  );
};

export default App;

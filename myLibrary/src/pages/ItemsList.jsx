import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getItems } from "../services/itemsService";
import List from "../components/List/List";
import "./ItemsList.css";
import Spinner from "../components/Spinner";
import ErrorBox from "../components/ErrorBox";

export default function ItemsList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const qParam = searchParams.get("q");
  const [query, setQuery] = useState(qParam ?? ""); // <-- FIX
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      if (!query) {
        setItems([]); // очищаем список
        return;
      }

      try {
        setLoading(true);
        const data = await getItems(query);
        setItems(data);
      } catch (err) {
        setError("Failed to fetch items");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [query]);

  return (
    <div className="items-page">
      <div className="items-header">
        <h1>Library</h1>
        <div className="search-box">
          <input
            type="text"
            value={query}
            onChange={(e) => {
              const value = e.target.value;
              setQuery(value);
              if (value) setSearchParams({ q: value });
              else setSearchParams({});
            }}
            placeholder="Search for books..."
          />
        </div>
      </div>

      {loading && (
        <div className="items-status">
          <Spinner />
        </div>
      )}
      {error && (
        <div className="items-status">
          <ErrorBox message={error} />
        </div>
      )}

      {!loading && !error && (
        <div className="items-grid">
          <List items={items} />
        </div>
      )}
    </div>
  );
}

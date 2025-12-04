// src/pages/ItemsList.jsx
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { fetchItems, setQuery } from "../features/items/itemsSlice";

import List from "../components/List/List";
import Spinner from "../components/Spinner";
import ErrorBox from "../components/ErrorBox";
import "./ItemsList.css";

export default function ItemsList() {
  const dispatch = useDispatch();
  const [params, setParams] = useSearchParams();

  const { list, loadingList, errorList, query } = useSelector(
    (state) => state.items
  );

  // Initialize query from URL
  useEffect(() => {
    const qParam = params.get("q") || "";
    dispatch(setQuery(qParam));
    if (qParam) dispatch(fetchItems(qParam));
  }, []);

  // Update URL and fetch when query changes
  useEffect(() => {
    setParams(query ? { q: query } : {});
    if (query) dispatch(fetchItems(query));
  }, [query]);

  return (
    <div className="items-page">
      <div className="items-header">
        <h1>Library</h1>
        <div className="search-box">
          <input
            type="text"
            value={query}
            onChange={(e) => dispatch(setQuery(e.target.value))}
            placeholder="Search for books..."
          />
        </div>
      </div>

      {loadingList && (
        <div className="items-status">
          <Spinner />
        </div>
      )}
      {errorList && (
        <div className="items-status">
          <ErrorBox message={errorList} />
        </div>
      )}

      <div className="items-grid">
        <List items={list} />
      </div>
    </div>
  );
}

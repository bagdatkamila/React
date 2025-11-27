import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { fetchItemById } from "../features/items/itemsSlice";
import { formatDescription } from "../utils/formatDescription";
import "./ItemDetails.css";

export default function ItemDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { selectedItem, loadingItem, errorItem } = useSelector(
    (state) => state.items
  );

  useEffect(() => {
    dispatch(fetchItemById(id));
  }, [id, dispatch]);

  if (loadingItem) return <div className="items-status">Loading…</div>;
  if (errorItem) return <div className="items-status">Error loading item.</div>;
  if (!selectedItem) return <div className="items-status">Not found.</div>;

  const cleanDescription = formatDescription(selectedItem.description);

  return (
    <div className="item-details-page">
      <div className="item-details-card">

        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>

        {selectedItem.cover && (
          <img
            className="item-cover"
            src={selectedItem.cover}
            alt={selectedItem.title}
          />
        )}

        <h2>{selectedItem.title}</h2>

        <ReactMarkdown
        components={{
            p: ({ node, ...props }) => <p className="markdown-text" {...props} />,
            a: ({ node, ...props }) => <a className="markdown-link" {...props} />,
            ul: ({ node, ...props }) => <ul className="markdown-list" {...props} />,
            li: ({ node, ...props }) => <li className="markdown-list-item" {...props} />,
        }}
        >
        {cleanDescription}
        </ReactMarkdown>


        <div className="item-details-meta">
          <p><b>ID:</b> {selectedItem.id}</p>
          {selectedItem.year && <p><b>Published:</b> {selectedItem.year}</p>}
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getItemById } from "../services/itemsService";
import "./ItemDetails.css";
import Spinner from "../components/Spinner";
import ErrorBox from "../components/ErrorBox";

export default function ItemDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function load() {
        try {
            const data = await getItemById(id);
            setItem(data);
        } catch (err) {
            setError("Error loading item");
        } finally {
            setLoading(false);
        }
        }
        load();
    }, [id]);

    if (loading) return <Spinner />;
    if (error) return <ErrorBox message={error} />;
    if (!item) return <p>Not found.</p>;

    return (
    <div className="item-details-page">
        <div className="item-details-card">
        <button className="back-btn" onClick={() => navigate(-1)}>
            ← Back
        </button>

        <h2>{item.title}</h2>

        {item.covers && (
            <img
            className="item-cover"
            src={`https://covers.openlibrary.org/b/id/${item.covers[0]}-L.jpg`}
            alt={item.title}
            />
        )}

        <p>{item.description?.value || "No description available."}</p>

        {item.subjects && (
            <p>
            <b>Subjects:</b> {item.subjects.slice(0, 5).join(", ")}
            </p>
        )}

        {item.first_publish_date && (
            <div className="item-details-meta">
            <b>First published:</b> {item.first_publish_date}
            </div>
        )}
        </div>
    </div>
    );

}

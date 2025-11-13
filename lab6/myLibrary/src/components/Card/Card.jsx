import { Link } from "react-router-dom";
import "./Card.css";

export default function Card({ item }) {
  const id = item.key.replace("/works/", "");
  return (
    <div className="card">
      <h3>{item.title}</h3>
      <p>{item.author_name?.[0]}</p>
      <Link to={`/items/${id}`}>Details →</Link>
    </div>
  );
}

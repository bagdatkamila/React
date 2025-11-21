import Card from "../Card/Card";
import "./List.css";

export default function List({ items }) {
  return (
    <div className="list">
      {items.map((book) => (
        <Card key={book.key} item={book} />
      ))}
    </div>
  );
}

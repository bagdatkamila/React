import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <section className="home-page">
      <div className="home-content">
        <h1>Welcome to <span className="highlight">OpenLibrary</span></h1>
        <p>
          Discover, search, and explore millions of books from the
          <b> OpenLibrary </b>.  
          Your personal gateway to the world of literature!
        </p>
        <Link to="/items" className="explore-btn">
          Start Exploring →
        </Link>
      </div>

      <div className="home-image">
        <img
          src="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1000&q=80"
          alt="Bookshelf"
        />
      </div>
    </section>
  );
}

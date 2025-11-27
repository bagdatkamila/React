import "./About.css";

export default function About() {
  return (
    <section className="about-page">
      <div className="about-card">
        <h2>About myLibrary</h2>
        <p>
          <strong>myLibrary</strong> is a React project that
          allows users to search books using
          the <a href="https://openlibrary.org/" target="_blank" rel="noreferrer">
            OpenLibrary API
          </a>
        </p>
      </div>
    </section>
  );
}

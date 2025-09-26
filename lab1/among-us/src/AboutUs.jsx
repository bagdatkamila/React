import React from "react"
import "./AboutUs.css";

function AboutUs(){
  return (
    <section className="about">
      <div className="container">
        <h1>About Us</h1>
        <h2 className="name">Kamila</h2>
        <div className="about-items">
          <div className="about-item">
            <span>💼</span>
            <h2>Work at Netcracker</h2>
          </div>
          <div className="about-item">
            <span>🎶</span>
            <h2>Love music</h2>
          </div>
          <div className="about-item">
            <span>🎬</span>
            <h2>Watch kdramas</h2>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
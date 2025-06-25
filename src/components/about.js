import React, { useState, useEffect } from 'react';
import '../styles/about.css'; // Import your CSS file
import { Link } from 'react-router-dom'; // Import Link for routing
import aboutData from './jsonData/aboutData.json'; // Import the JSON file

const About = () => {
  const [userMenuVisible, setUserMenuVisible] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const toggleUserMenu = () => {
    setUserMenuVisible((prev) => !prev);
  };

  return (
    <div>
      <main>
        <div className="about-container">
          <div className="heading">
            <h1>{aboutData.aboutSection.title}</h1>
          </div>
          <div className="about-us">
            <p>{aboutData.aboutSection.content}</p>
          </div>
        </div>

        <div className="about-info">
            <div className="line">
                <span>Our</span>
                <br />
                <span className="highlight">{aboutData.visionSection.title}</span>
            </div>
            <p className="about">
                {aboutData.visionSection.content}
            </p>
        </div>

        <div className="about-info">
            <div className="line">
                <span>What</span>
                <br />
                <span>Makes Us</span>
                <br />
                <span className="highlight">Special?</span>
            </div>
             <p className="special">
                {aboutData.specialSection.content}
            </p>
        </div>
        
        <div className="about-info">
            <div className="line">
                <span>Our</span>
                <br />
                <span className="highlight">{aboutData.commitmentSection.title}</span>
            </div>
            <p className="commitment">
                {aboutData.commitmentSection.content}
            </p>
        </div>
      </main>
    </div>
  );
};

export default About;

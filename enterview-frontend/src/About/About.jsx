import React from 'react';
import './About.css';
import logo from '../assets/enterviewAI.png'; 
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate('/login'); 
  };

  return (
    <div className="about-container">
      <img src={logo} alt="Logo" className="logo" />
      
    <button onClick={handleGetStartedClick} className="get-started-button">
        Get Started
    </button>
      
    </div>
  );
}

export default About;

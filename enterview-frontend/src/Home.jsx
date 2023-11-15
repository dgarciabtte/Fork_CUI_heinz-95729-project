import './Home.css';
import Toolbar from './NavigationBar/Toolbar';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleDashboardClick = () => {
    navigate('/DashboardPage');
  };

  const handlePracticeClick = () => {
    navigate('/PracticeNew');
  };

  return (
    <div className="Home">
      <Toolbar />
      <div className="content-section">
        <div className="left-section">
          <button 
            className="menu-button rounded-button"
            onClick={handleDashboardClick}>
            My Dashboard
          </button>
          <button 
            className="menu-button rounded-button" 
            onClick={handlePracticeClick}>
            Practice New
          </button>
        </div>
        <div className="right-section"></div>
      </div>
    </div>
  );
};

export default Home;
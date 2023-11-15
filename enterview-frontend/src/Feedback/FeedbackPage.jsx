import './FeedbackPage.css';
import Toolbar from '../NavigationBar/Toolbar';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import backButton from '../assets/backButton.png';

const FeedbackPage = () => {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { question } = location.state;

  const handlePracticeClick = () => {
    navigate('/practicenew');
  };

  const handleBackButtonClick = () => {
    navigate('/DashboardPage');
  };

  const buttonData = [
    { width: "124px", text: 'Structure', color: 'rgba(121, 121, 121, 0.1)' },
    { width: "129px", text: 'Relevance', color: 'rgba(121, 121, 121, 0.1)' },
    { width: "120px", text: 'Coverage', color: 'rgba(121, 121, 121, 0.1)' },
    { width: "90px", text: 'Depth', color: 'rgba(121, 121, 121, 0.1)' },
    { width: "90px", text: 'Fillers', color: 'rgba(121, 121, 121, 0.1)' },
  ];

  const [buttonColors, setButtonColors] = useState(buttonData.map((data) => data.color));

  const handleButtonClick = (index) => {
    const newButtonColors = buttonData.map((data, i) =>
      i === index ? 'rgba(16, 0, 199, 0.1)' : data.color
    );
    setButtonColors(newButtonColors);
  };


  return (
    <div className="Home">
      <Toolbar />
      <div className="content-section">
        <div className="left-section-1">
          <button 
            className="menu-button new-rounded-button">
            My Dashboard
          </button>
          <button 
            className="menu-button rounded-button" 
            onClick={() => handlePracticeClick()}>
            Practice New
          </button>
        </div>
        <div className="right-section-1">
        <div style={{ display: "flex", alignItems: "center" }}>
          <button
            style={{
              backgroundColor: "transparent",
              border: "none",
              marginTop: "5px",
              cursor: "pointer",
            }}
            onClick={handleBackButtonClick}
          >
            <img src={backButton} style={{ width: "15px", height: "15px" }} alt="Back" />
          </button>
          <div className="title-wrapper">
            <h2>Feedback</h2>
          </div>
        </div>
            <div className = "main-container">
                <h3 className = "qs1">{question}</h3>
                <div className = "sub-content-section">
                    <div className = "sub-left-section">
                            <div className = "sub-sub-top-section">
                                <h4 className = "left-top-text">Your Answer</h4>
                            </div>
                            <div className = "sub-sub-bottom-section">
                                <h5 className = "left-bottom-text">Feedback</h5>
                            </div>
                    </div>
                    <div className = "sub-right-section">
                            <div className = "sub-sub-top-section">
                                <h6 className = "right-top-text">Waiting for feedback to be stored in frontend</h6>
                            </div>
                            <div className = "sub-sub-bottom-section">
                              <div>
                                {buttonData.map((data, index) => (
                                  <button className="button-type"
                                    key={index}
                                    style={{ width: data.width, backgroundColor: buttonColors[index]}}
                                    onClick={() => handleButtonClick(index)}
                                  >
                                    <span className="button-text">{data.text}</span>
                                  </button>
                                ))}
                              </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;
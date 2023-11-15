import React, { useState, useEffect } from 'react';
import './Toolbar.css';
import axios from 'axios';
import getCookie from '../utils/Cookie';
import { useNavigate } from 'react-router-dom';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const Toolbar = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate()

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/accounts/display_username', 
    {
      withCredentials: true,
      headers: {
        'X-CSRFToken': getCookie("csrftoken")
      } 
    })
      .then((response) => {
        const userData = response.data;
        if (userData) {
          setUsername(userData.username);
        } else {
          console.error('Invalid data format received from the API or no data available.');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleLogout = () => {
    axios.post('http://127.0.0.1:8000/api/accounts/logout/', {}, 
    {
      withCredentials: true,
      headers: {
        'X-CSRFToken': getCookie("csrftoken")
      } 
    })
      .then((response) => {
        console.log('Logout successful:', response.data);
        navigate('/');
      })
      .catch((error) => {
        console.error('Logout failed:', error);
      });
  };

  return (
    <div className="toolbar">
      <div className="left">
        <span className="light-text">{username}</span>
      </div>
      <div className="right" onClick={handleLogout} style={{ cursor: 'pointer' }}>
        <span className="light-text">Logout</span>
      </div>
    </div>
  );
};

export default Toolbar;

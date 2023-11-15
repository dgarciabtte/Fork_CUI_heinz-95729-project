import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import Toolbar from '../NavigationBar/Toolbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import QuestionBar from './QuestionBar';
import TmpQuestionBar from './TmpQuestionBar';
import TitleBar from './DashBoardTitleBar';
import getCookie from '../utils/Cookie';

const Dashboard = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [tmp_questions,setTmpQuestions] = useState([]);
  const [dataDeleted, setDataDeleted] = useState(false);

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  const handlePracticeClick = () => {
    navigate('/practicenew');
  };

  const deleteTmpData = () => {
    const csrftoken = getCookie('csrftoken');
    axios.post('http://127.0.0.1:8000/api/feedback/Delete_Tmp_Feedback_Man/', null, {
      withCredentials: true,
      headers: {
        'X-CSRFToken': csrftoken
      }
    })
      .then((response) => {
        console.log('Temporary data deleted successfully');
        setDataDeleted(true);
        // Fetch updated temporary data and remove the deleted question
      })
      .catch((error) => {
        console.error('Error while deleting temporary data:', error);
      });
  };
  
  
  const callDeleteTmpAPI = () => {
      deleteTmpData();
    };
  
  useEffect(() => {
      callDeleteTmpAPI();

  
    const intervalId = setInterval(() => {
      callDeleteTmpAPI();
      // Refresh the page every one minute
      window.location.reload();
    }, 60000);
      
      
  
      // Clean up the interval when the component unmounts
      return () => {
        clearInterval(intervalId);
      };
    }, []);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/feedback/Get_Feedback_Info/', { withCredentials: true })
      .then((response) => {
        const jsonData = response.data;
    

        if (jsonData && Array.isArray(jsonData)) {
          const questionsArray = jsonData.map((questionData) => ({
            text: (questionData.user_question != null) ? questionData.user_question.question : questionData.system_question.question,
            type: (questionData.user_question != null) ? questionData.user_question.category : questionData.system_question.category,
            company: (questionData.user_question != null) ? questionData.user_question.company : questionData.system_question.company,
            time: formatTime(questionData.time),
          }));

          setQuestions(questionsArray);
        } else {
          console.error('Invalid data format received from the API or no data available.');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/feedback/Get_Tmp_Feedback_Info/', { withCredentials: true })
      .then((response) => {
        const jsonData = response.data;

        if (jsonData && Array.isArray(jsonData)) {
          const tmpQuestionsArray = jsonData.map((questionData) => ({
            text: (questionData.user_question != null) ? questionData.user_question.question : questionData.system_question.question,
            type: (questionData.user_question != null) ? questionData.user_question.category : questionData.system_question.category,
            company: (questionData.user_question != null) ? questionData.user_question.company : questionData.system_question.company,
            time: formatTime(questionData.time),
          }));

          setTmpQuestions(tmpQuestionsArray);
        } else {
          console.error('Invalid data format received from the API or no data available.');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);


  return (
    <div className="Dashboard">
      <Toolbar />
      <div className="content-section">
        <div className="left-section">
          <button className="menu-button new-rounded-button">
            My Dashboard
          </button>
          <button
            className="menu-button rounded-button"
            onClick={() => handlePracticeClick()}
          >
            Practice New
          </button>
        </div>

        <div className="right-section">
          <h1 className="smaller-heading">Past Questions</h1>

          <TitleBar />

          {tmp_questions.map((questionData, index) => (
            <TmpQuestionBar
              key={index}
              text={questionData.text}
              type={questionData.type}
              company={questionData.company}
              time={questionData.time}
            />
          ))}

          {questions.map((questionData, index) => (
            <QuestionBar
              key={index}
              text={questionData.text}
              type={questionData.type}
              company={questionData.company}
              time={questionData.time}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

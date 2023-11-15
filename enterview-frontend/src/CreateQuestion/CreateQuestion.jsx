import React, { useState } from 'react';
import './CreateQuestion.css';
import axios from 'axios';
import getCookie from '../utils/Cookie';
import { useNavigate } from 'react-router-dom';

const CreateQuestionForm = () => {
  const navigate = useNavigate();
  const [newQuestion, setNewQuestion] = useState({ question: '', category: '', company: '' });

  const handlePracticeClick = () => {
    navigate('/practicenew');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newQuestionData = {
        question: e.target.question.value,
        category: e.target.category.value,
        company: e.target.company.value,
      };

      const csrftoken = getCookie('csrftoken');
      const response = await axios.post('http://127.0.0.1:8000/api/user_questions/create_user_question/', newQuestionData, {
        withCredentials: true,
        headers: {
          'X-CSRFToken': csrftoken,
        },
      });

      if (response.status === 201) {
        setNewQuestion({ question: '', category: '', company: '' });
        alert('Question created successfully');
      }
    } catch (error) {
      console.error('Error creating question:', error);
      alert('Error creating question. Please check your input.');
    }
  };

  return (
    <div>
      <h2>Create a New Question</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="question">Question:</label>
          <input type="text" id="question" name="question" required />
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <select id="category" name="category" required>
            <option value="Behavioral">Behavioral</option>
            <option value="Product Design">Product Design</option>
            <option value="Product Strategy">Product Strategy</option>
            <option value="Technical">Technical</option>
            <option value="Analytical">Analytical</option>
          </select>
        </div>
        <div>
          <label htmlFor="company">Company:</label>
          <select id="company" name="company" required>
            <option value="Microsoft">Microsoft</option>
            <option value="Facebook">Facebook</option>
            <option value="Apple">Apple</option>
            <option value="Amazon">Amazon</option>
            <option value="Google">Google</option>
          </select>
        </div>
        <button type="submit">Done</button>
      </form>
      <button onClick={() => handlePracticeClick()}>
        Back to All
      </button>
    </div>
  );
};

export default CreateQuestionForm;

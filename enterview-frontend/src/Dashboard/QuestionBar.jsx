import React from 'react';
import './QuestionBar.css'; 
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const QuestionBar = ({text, type, company, time}) => {

    const navigate = useNavigate();

    const typeToClass = {
        Behavioral: 'question-type-behavioral',
        'Product Design': 'question-type-product-design',
        'Product Strategy': 'question-type-product-strategy',
        Technical: 'question-type-technical',
        Analytical: 'question-type-analytical',
      };
    
    const typeClass = typeToClass[type] || 'question-type-default';
    
    const handleButtonClick = (question) => {
        navigate('/FeedbackPage', { state: { question } });
      };
    
    return (
        <div className="question-bar">
            <div className="field">
                <button className="question-button-1" onClick={() => handleButtonClick(text)}>{text}</button>
            </div>
            <div className="right-fields">
                <div className="field">
                    <label>{company}</label>
                </div>
                <div className="field">
                    <span className={typeClass}>{type}</span> 
                </div>
                <div className="field">
                    <label>{time}</label>
                </div>
            </div>
        </div>
    );
}

export default QuestionBar;
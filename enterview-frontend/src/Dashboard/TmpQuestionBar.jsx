import React from 'react';
import './TmpQuestionBar.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ClipLoader } from 'react-spinners'; 

const TmpQuestionBar = ({text, type, company, time}) => {

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
        <div className="tmp-question-bar">
            <div className="spinner-with-button">
                <ClipLoader
                    color={'#1C1B1E'}
                    loading={true}
                    size={12}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
                <button className="question-button-1" onClick={() => handleButtonClick(text)}>{text}</button>
            </div>
            <div className="tmp-right-fields">
                <div className="tmp-company-field">
                    <label>{company}</label>
                </div>
                <div className="tmp-type-field">
                    <span className={typeClass}>{type}</span>
                </div>
                <div className="field">
                    <label>{time}</label>
                </div>
            </div>
        </div>
    );
}

export default TmpQuestionBar;

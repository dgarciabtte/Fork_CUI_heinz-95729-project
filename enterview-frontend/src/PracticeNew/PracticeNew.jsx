import React, { useState, useEffect } from 'react';
import './PracticeNew.css';
import { useNavigate } from 'react-router-dom';
import Toolbar from '../NavigationBar/Toolbar';
import axios from 'axios';
import getCookie from '../utils/Cookie';

const PracticeNew = () => {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedCompany, setSelectedCompany] = useState('');
    const [selectedQuestionType, setSelectedQuestionType] = useState('');
    const [userQuestions, setUserQuestions] = useState([]);
    const [filteredQuestions, setFilteredQuestions] = useState([]);
    const [createQuestions, setCreateQuestions] = useState([]);

    const handleQuestionClick = (question, category, company, type) => {
        navigate('/QuestionPage', { state: { question, category, company, type } });
    };

    const handleDashboardClick = () => {
        navigate('/DashboardPage');
    };

    const handleCreateClick = () => {
        navigate('/createquestion');
    };

    const handleCompanyChange = (e) => {
        setSelectedCompany(e.target.value);
    };

    const handleQuestionTypeChange = (e) => {
        setSelectedQuestionType(e.target.value);
    };

    useEffect(() => {
        const csrftoken = getCookie('csrftoken');

        axios.get('http://127.0.0.1:8000/api/questions/display_questions', {
            withCredentials: true,
            headers: {
                'X-CSRFToken': csrftoken,
            },
        })
        .then((response) => {
            const jsonData = response.data;
            if (jsonData && Array.isArray(jsonData)) {
                const questionsArray = jsonData.map((questionData) => ({
                    text: questionData.question,
                    category: questionData.category,
                    company: questionData.company,
                    time: questionData.time,
                    type: "system_question",
                }));

                setQuestions(questionsArray);
                setFilteredQuestions(questionsArray); 
            } else {
                console.error('Invalid data format received from the API or no data available.');
            }
        })
        .catch((error) => {
            console.error(error);
        });

        axios.get('http://127.0.0.1:8000/api/user_questions/display_user_questions', {
            withCredentials: true,
            headers: {
                'X-CSRFToken': csrftoken,
            },
        })
        .then((response) => {
            const jsonData = response.data;
            if (jsonData && Array.isArray(jsonData)) {
                const questionsArray = jsonData.map((questionData) => ({
                    text: questionData.question,
                    category: questionData.category,
                    company: questionData.company,
                    time: questionData.time,
                    type: "user_question",
                }));

                setUserQuestions(questionsArray);
                setCreateQuestions(questionsArray)
            } else {
                console.error('Invalid data format received from the user questions API or no data available.');
            }
        })
        .catch((error) => {
            console.error(error);
        });
    }, []);

    useEffect(() => {
        //const combinedQuestions = [...questions, ...userQuestions];
        const combinedQuestions = questions;
    
        // Filter by category
        const filteredByCategory = selectedCategory
            ? combinedQuestions.filter((question) => question.category === selectedCategory)
            : combinedQuestions;
    
        // Filter by company
        const filteredByCompany = selectedCompany
            ? combinedQuestions.filter((question) => question.company === selectedCompany)
            : combinedQuestions;
    
        // Filter by question type
        const filteredByQuestionType = selectedQuestionType
            ? combinedQuestions.filter((question) => question.type === selectedQuestionType)
            : combinedQuestions;
    
        // Intersect the three sets to get the final result
        const filtered = filteredByCategory.filter((question) =>
            filteredByCompany.includes(question) && filteredByQuestionType.includes(question)
        );
    
        setFilteredQuestions(filtered);
    }, [selectedCategory, selectedCompany, selectedQuestionType, questions, userQuestions]);
    

    const categoryToClass = {
        Behavioral: 'question-type-behavioral',
        'Product Design': 'question-type-product-design',
        'Product Strategy': 'question-type-product-strategy',
        Technical: 'question-type-technical',
        Analytical: 'question-type-analytical',
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
                    <button className="menu-button new-rounded-button">
                        Practice New
                    </button>
                </div>
                <div className="right-container">
                    <div className="right-title-wrapper">
                       Question Database
                    </div>
                    <div className="right-sub-wrapper">
                       Every available questions for practice
                    </div>
                <div className="create-section">
                    <div className="create-header">
                        <div className="create-title-wrapper">
                        Customized Questions
                        </div>
                    <button className="create-button" onClick={handleCreateClick}>
                            Create Your Own Question
                    </button>
                    </div>
                    <div className="column-section">
                        {createQuestions.map((questionData, index) => (
                            <button
                                className="question-button"
                                key={index}
                                onClick={() => handleQuestionClick(questionData.text, questionData.category,
                                questionData.company,questionData.type)}>
                                {questionData.text}
                                <br />
                                <br />
                                <span className={categoryToClass[questionData.category] || 'question-type-default'}>
                                    {questionData.category}
                                </span>
                                <span className="company">
                                    {questionData.company}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
                <div className="right-section">
                    <div className="title-wrapper">
                        <h3>All Interview Questions</h3>
                    </div>
                    <div className="filter-wrapper">
                        <select
                            className="filter"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}>
                            <option value="">All Roles</option>
                            <option value="Behavioral">Behavioral</option>
                            <option value="Product Design">Product Design</option>
                            <option value="Product Strategy">Product Strategy</option>
                            <option value="Technical">Technical</option>
                            <option value="Analytical">Analytical</option>
                        </select>
                        <select
                            className="filter"
                            value={selectedCompany}
                            onChange={handleCompanyChange}>
                            <option value="">All Companys</option>
                            <option value="Apple">Apple</option>
                            <option value="Microsoft">Microsoft</option>
                            <option value="Facebook">Facebook</option>
                            <option value="Amazon">Amazon</option>
                            <option value="Google">Google</option>
                        </select>
                        <select
                            className="filter"
                            value={selectedQuestionType}
                            onChange={handleQuestionTypeChange}>
                            <option value="">All Types</option>
                            <option value="system_question">System Questions</option>
                            <option value="user_question">User Questions</option>
                        </select>
                    </div>
                    <div className="column-section">
                        {filteredQuestions.map((questionData, index) => (
                            <button
                                className="question-button"
                                key={index}
                                onClick={() => handleQuestionClick(questionData.text, questionData.category,
                                questionData.company,questionData.type)}>
                                {questionData.text}
                                <br />
                                <br />
                                <span className={categoryToClass[questionData.category] || 'question-type-default'}>
                                    {questionData.category}
                                </span>
                                <span className="company">
                                    {questionData.company}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
};

export default PracticeNew;
import React, { useRef, useState, useEffect } from 'react';
import './LoadFeedbackPage.css';
import { useNavigate } from 'react-router-dom';
import BeatLoader from "react-spinners/BeatLoader";

const LoadFeedbackPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        })
    })

    const handleReturnButton = () => {
        // Navigate to generating feedback page
        navigate('/DashboardPage');
    };

    return (
        <div className = "background">
            <div className = "primary-box">
                <BeatLoader
                color={'#1C1B1E'}
                loading={true}
                size={50}
                aria-label="Loading Spinner"
                data-testid="loader"
                />
                <h1 className='primary-text'>Generating Feedback...</h1>
                <p className="sub-text">You can access the results later in your dashboard</p>
                <button className = "return-button" onClick={handleReturnButton}>
                    <span className="return-text">Return to dashboard</span>
                </button>
            </div>
        </div>
    );
}

export default LoadFeedbackPage;
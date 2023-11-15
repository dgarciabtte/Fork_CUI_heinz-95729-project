import React from 'react';
import './DashBoardTitleBar.css';

const TitleBar = () => {
    return (
        <div className="title-bar">
            <div className="title-field">Questions</div>
            <div className="title-right-fields">
                <div className="company-title-field">Company</div>
                <div className="type-title-field">Type</div>
                <div className="title-field">Time</div>
            </div>
        </div>
    );
}

export default TitleBar;
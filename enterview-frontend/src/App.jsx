import QuestionPage from './Recording/QuestionPage';
import {Routes, Route} from 'react-router-dom';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import LoadFeedbackPage from './LoadFeedback/LoadFeedbackPage';
import DashboardPage from './Dashboard/Dashboard';
import FeedbackPage from './Feedback/FeedbackPage';
import Signup from './Accounts/Signup';
import Login from './Accounts/Login';
import CreateQuestion from './CreateQuestion/CreateQuestion';
import PracticeNew from './PracticeNew/PracticeNew';
import About from './About/About';
import React from 'react';


const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<About />} />
        <Route path='about' element={<About />} />
        <Route path='signup' element={<Signup />} />
        <Route path='login' element={<Login />} />
        <Route 
          path='questionpage' 
          element={
          <PrivateRoute>
            <QuestionPage />
          </PrivateRoute>
          }
        />
        <Route 
          path='loadfeedbackpage' 
          element={
          <PrivateRoute>
            <LoadFeedbackPage />
          </PrivateRoute>
          }
        />
        <Route 
          path='dashboardpage' 
          element={
          <PrivateRoute>
            <DashboardPage />
          </PrivateRoute>
          }
        />
        <Route 
          path='feedbackpage' 
          element={
          <PrivateRoute>
            <FeedbackPage />
          </PrivateRoute>
          }
        />
        <Route 
          path='createquestion' 
          element={
          <PrivateRoute>
            <CreateQuestion />
          </PrivateRoute>
          }
        />
        <Route 
          path='practicenew' 
          element={
          <PrivateRoute>
            <PracticeNew />
          </PrivateRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App;
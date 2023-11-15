import React, { useRef, useState } from 'react';
import axios from 'axios';
import recordButton from '.././assets/recordButton.png';
import finishButton from '.././assets/finishButton.png';
import backButton from '.././assets/backButton.png';
import './QuestionPage.css';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import SoundWave from './Soundwave';

const QuestionPage = () => {
  const [selected, setSelected] = useState(null);
  const location = useLocation();
  const { question, category, company, type } = location.state;
  const mediaRecorderRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [isRecordingFinished, setIsRecordingFinished] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [recordedAudio, setRecordedAudio] = useState(null); // Variable to store the recorded audio
  const [downloadLink, setDownloadLink] = useState(null); // Variable to store the download link
  const [timer, setTimer] = useState(0);
  const [timerIntervalId, setTimerIntervalId] = useState(null);
  const navigate = useNavigate()

  const handleBackButtonClick = () => {
    // Navigate to generating feedback page
    navigate('/PracticeNew');
  };

  const handleDoneButtonClick = () => {
    handleTranscribeAudio();
    // Navigate to generating feedback page
    navigate('/LoadFeedbackPage');
  };

  const startTimer = () => {
    setTimer(0);
    const intervalId = setInterval(() => {
      setTimer(prevTimer => prevTimer + 1);
    }, 1000);
    setTimerIntervalId(intervalId);
  };

  const stopTimer = (intervalId) => {
    clearInterval(intervalId);
  };

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);

      const chunks = []; // Array to store the recorded audio chunks

      mediaRecorder.ondataavailable = (e) => {
        chunks.push(e.data);
      };

      mediaRecorder.onstop = () => {
        setRecording(false);

        // Combine the recorded audio chunks into a single Blob
        const audioBlob = new Blob(chunks, { type: 'audio/m4a' });

        // Convert the Blob to a File object with a specific filename
        const audioFile = new File([audioBlob], 'recorded_audio.m4a', {
          type: 'audio/m4a',
          lastModified: Date.now(),
        });

        setRecordedAudio(audioFile); // Save the recorded audio as a File object

        // Create a download link for the recorded audio
        const audioUrl = URL.createObjectURL(audioFile);
        setDownloadLink(audioUrl);
      };

      mediaRecorderRef.current = mediaRecorder;
      setRecording(true);
      setIsRecordingFinished(false);
      startTimer();
      mediaRecorder.start();
    } catch (error) {
      setErrorMessage('Error accessing microphone: ' + error.message);
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecordingFinished(true);
      stopTimer(timerIntervalId);
    }
  };

  const handleTranscribeAudio = async () => {
    if (recordedAudio) {
      try {
        const formData = new FormData();
        formData.append('audio_file', recordedAudio);
        const question_input = {'question': question, 'company': company, 'category': category, 'question_type': type};
        formData.append('question', JSON.stringify(question_input));
        // Send the recorded audio data to the Django backend for transcription
        const response = await axios.post('http://127.0.0.1:8000/api/feedback/Process_Answer/', formData);
        setTranscript(response.data.transcript);
      } catch (error) {
        setErrorMessage('Error transcribing audio: ' + error.message);
      }
    } else {
      setErrorMessage('Please record audio first.');
    }
  };

  return (
    <div className="background">
      <div className="back-container">
        <button
          style={{
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
          }}
          onClick={handleBackButtonClick}
        >
          <img src={backButton} style={{ width: "50px", height: "50px" }} />
        </button>
      </div>
      <div className="qs-container">
        <h1 className="qs">{question}</h1>
      </div>
      <div className="box">
        {isRecordingFinished ? (
          <p className="mid-text">Recording Finished</p>
        ) : recording ? (
          <p className="mid-text">Recording: {timer} seconds</p>
        ) : (
          <p className="mid-text">Record audio</p>
        )}
        <button
          style={{
            backgroundColor: "transparent",
            border: "none",
            marginTop: recording ? "0px" : "5px",
            cursor: "pointer",
          }}
          onClick={recording ? handleStopRecording : handleStartRecording}
        >
          { recording ? (
            <div className="recording-circle">
              <SoundWave />
            </div>
          ) : isRecordingFinished ? (
            <img
              src={finishButton}
              alt="Finish Recording"
              style={{ width: "75px", height: "75px" }}
            />
          ) : (
            <img
              src={recordButton}
              alt="Start Recording"
              style={{ width: "75px", height: "75px" }}
            />
          )}
        </button>
      </div>
      {isRecordingFinished && (
        <>
          <button className="done-button" onClick={handleDoneButtonClick}>
            Done
          </button>
        </>
      )}
      {transcript && (
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <h3>Transcript:</h3>
          <p>{transcript}</p>
        </div>
      )}
      {errorMessage && (
        <div style={{ marginTop: "20px", textAlign: "center", color: "red" }}>
          <p>{errorMessage}</p>
        </div>
      )}
    </div>
  );
}

export default QuestionPage;

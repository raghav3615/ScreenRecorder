import React, { useState, useRef } from 'react';
import './ScreenRecorder.css';

const ScreenRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [videoUrl, setVideoUrl] = useState('');
  const recordedChunks = useRef([]);

  // Start recording function
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { mediaSource: 'screen' },
        audio: false,
      });
      const recorder = new MediaRecorder(stream, { mimeType: 'video/webm' });

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunks.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(recordedChunks.current, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        setVideoUrl(url);
        recordedChunks.current = [];
      };

      recorder.start();
      setIsRecording(true);
      setMediaRecorder(recorder);
    } catch (err) {
      console.error('Error: ', err);
    }
  };

  // Stop recording function
  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  // Upload function (for handling video uploads)
  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
    }
  };

  return (
    <div className="container">
      <aside className="sidebar">
        <div className="logo">
          <img src=".\img\logo scnrec.png" alt="Capture Logo" />
          <span>Capture</span>
        </div>
        <nav className="nav">
          <a href="#" className="nav-item active">
            <i className="icon-home"></i> Home
          </a>
          <a href="#" className="nav-item">
            <i className="icon-folder"></i> Files
          </a>
          <a href="#" className="nav-item">
            <i className="icon-settings"></i> Settings
          </a>
        </nav>
        <div className="support-links">
          <a href="#">Help</a>
          <a href="#">Support</a>
        </div>
      </aside>

      <main className="main-content">
        <header className="header">
          <h2>Record a new Video</h2>
          <p>Click the button below to record a new video</p>
        </header>

        <div className="illustration">
          <img src=".\img\dashboard.png" alt="Illustration" />
        </div>

        <div className="action-buttons">
          {/* Record Button */}
          <button className="btn record-btn" onClick={startRecording}>
            <i className="icon-record"></i> Record
          </button>

          {/* Upload Button */}
          <label className="btn upload-btn" htmlFor="videoUpload">
            <i className="icon-upload"></i> Upload
          </label>
          <input
            type="file"
            accept="video/*"
            id="videoUpload"
            onChange={handleUpload}
            style={{ display: 'none' }} // Hidden input field
          />
        </div>

        {videoUrl && (
          <div className="video-preview">
            <h3>Preview:</h3>
            <video src={videoUrl} controls width="600"></video>
          </div>
        )}
      </main>
    </div>
  );
};

export default ScreenRecorder;

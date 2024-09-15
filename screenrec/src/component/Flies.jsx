import React, { useState } from 'react';
import './Files.css';

const FilesPage = () => {
  const [savedVideos, setSavedVideos] = useState(() => {
    const saved = localStorage.getItem('savedVideos');
    return saved ? JSON.parse(saved) : [];
  });

  return (
    <div className="files-container">
      <h2>Saved Recordings</h2>
      {savedVideos.length === 0 ? (
        <p>No videos saved yet.</p>
      ) : (
        <ul className="video-list">
          {savedVideos.map((videoUrl, index) => (
            <li key={index}>
              <video src={videoUrl} controls width="400"></video>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FilesPage;

// FilesPage.js
import React, { useEffect, useState } from 'react';
import { db, auth } from './firebase';
import { collection, getDocs } from 'firebase/firestore';

const FilesPage = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchUserVideos = async () => {
      const userVideos = [];
      const querySnapshot = await getDocs(collection(db, 'videos', auth.currentUser.uid));
      querySnapshot.forEach((doc) => {
        userVideos.push(doc.data());
      });
      setVideos(userVideos);
    };

    if (auth.currentUser) {
      fetchUserVideos();
    }
  }, []);

  return (
    <div className="files-container">
      <h2>Your Recorded Videos</h2>
      <div className="video-list">
        {videos.map((video, index) => (
          <div key={index} className="video-item">
            <video src={video.url} controls width="400"></video>
            <p>Uploaded on: {new Date(video.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilesPage;

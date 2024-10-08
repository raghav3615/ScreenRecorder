const ScreenRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [currentPage, setCurrentPage] = useState('home'); // Handle page switching
  const [savedVideos, setSavedVideos] = useState([]); // Store fetched videos
  const recordedChunks = useRef([]);

  // Page switching function
  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (page === 'files') {
      fetchSavedVideos(); // Fetch saved videos when switching to Files page
    }
  };

  // Fetch saved videos from Firebase
  const fetchSavedVideos = async () => {
    // Assuming you have Firebase set up already, fetch video metadata from Firestore
    const db = firebase.firestore();
    const videosRef = db.collection('videos'); // Assuming a 'videos' collection in Firestore
    const snapshot = await videosRef.get();
    const videos = snapshot.docs.map((doc) => doc.data());
    setSavedVideos(videos);
  };

  // Start recording function
  const startRecording = async () => {
    // ... your existing startRecording code
  };

  // Stop recording function
  const stopRecording = () => {
    // ... your existing stopRecording code
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
          <a
            href="#"
            className={`nav-item ${currentPage === 'home' ? 'active' : ''}`}
            onClick={() => handlePageChange('home')}
          >
            <i className="icon-home"></i> Home
          </a>
          <a
            href="#"
            className={`nav-item ${currentPage === 'files' ? 'active' : ''}`}
            onClick={() => handlePageChange('files')}
          >
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
        {currentPage === 'home' && (
          <div>
            <header className="header">
              <h2>Record a Video</h2>
              <p>Click the button below to record a new video</p>
            </header>

            <div className="illustration">
              <img src=".\img\dashboard.png" alt="Illustration" />
            </div>

            <div className="action-buttons">
              <button className="btn record-btn" onClick={startRecording}>
                <i className="icon-record"></i> Record
              </button>

              <label className="btn upload-btn" htmlFor="videoUpload">
                <i className="icon-upload"></i> Upload
              </label>
              <input
                type="file"
                accept="video/*"
                id="videoUpload"
                onChange={handleUpload}
                style={{ display: 'none' }}
              />
            </div>

            {videoUrl && (
              <div className="video-preview">
                <h3>Preview:</h3>
                <video src={videoUrl} controls width="600"></video>
              </div>
            )}
          </div>
        )}

        {currentPage === 'files' && (
          <div>
            <header className="header">
              <h2>Saved Videos</h2>
              <p>Your recorded and uploaded videos</p>
            </header>

            <div className="files-list">
              {savedVideos.length > 0 ? (
                savedVideos.map((video, index) => (
                  <div key={index} className="file-item">
                    <h3>{video.name}</h3>
                    <video src={video.url} controls width="400"></video>
                  </div>
                ))
              ) : (
                <p>No videos saved yet.</p>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ScreenRecorder;

import React, { useState, useRef } from 'react';

const ScreenRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const mediaRecorderRef = useRef(null);
  const videoRef = useRef(null);

  // Start screen recording
  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
    videoRef.current.srcObject = stream;
    
    const mediaRecorder = new MediaRecorder(stream, {
      mimeType: "video/webm; codecs=vp9"
    });

    mediaRecorder.ondataavailable = handleDataAvailable;
    mediaRecorder.start();
    mediaRecorderRef.current = mediaRecorder;
    setIsRecording(true);
  };

  // Stop recording
  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);
  };

  // Handle the data chunks available after recording
  const handleDataAvailable = (event) => {
    if (event.data.size > 0) {
      setRecordedChunks((prev) => prev.concat(event.data));
    }
  };

  // Download the recorded video
  const downloadVideo = () => {
    const blob = new Blob(recordedChunks, {
      type: "video/webm"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = "screen_recording.webm";
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
    setRecordedChunks([]); // Clear after download
  };

  return (
    <div className="screen-recorder p-4">
      <video ref={videoRef} autoPlay playsInline className="w-full h-auto border-2 border-gray-300 rounded-lg mb-4" />
      <div className="flex space-x-2">
        {isRecording ? (
          <button onClick={stopRecording} className="bg-red-500 text-white py-2 px-4 rounded">
            Stop Recording
          </button>
        ) : (
          <button onClick={startRecording} className="bg-green-500 text-white py-2 px-4 rounded">
            Start Recording
          </button>
        )}
      </div>
      {recordedChunks.length > 0 && (
        <button onClick={downloadVideo} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
          Download Video
        </button>
      )}
    </div>
  );
};

export default ScreenRecorder;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UploadPage() {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    console.log("changing file")
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('file', file);
    console.log("sending file to backend now")
    axios.post('http://localhost:5000/api/upload', formData)
      .then(response => {
        const fileId = response.data.file_id;
        navigate(`/select/${fileId}`);  // Navigate to the visualization page
      })
      .catch(error => {
        console.error('Upload error:', error);
      });
  };

  return (
    <div>
      <h2>Upload CSV File</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default UploadPage;

import React, { useState, useRef } from 'react';
import "./Upload.css";
import { useNavigate } from 'react-router';

function Upload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // Handle file selection
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  //handle file upload
  const handleUpload =  async(e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('fileUpload', selectedFile);

      //sending the file to the server
      await fetch('http://localhost:8000/upload', {
        method: 'POST',
        body: formData,
      })

      //response is received from the server
      .then(response => {
        if (!response.ok) {
          alert("File Upload failed");
        }
        return response.json();
      })
      .then(data => {
        alert(data.message);
      })
      .catch(error => alert(error.message));
        navigate("/download");  
    };

  return (
    <div className="file-upload">
      <div
        className={`dropzone ${selectedFile ? 'has-file' : ''}`}
        onClick={() => fileInputRef.current.click()}
      >
        {/*if the file is selected then it will display selected file is ... else 
        it will display Drag and Drop files here to upload 
        if-else statement*/}
        {selectedFile ? (<p>Selected File: {selectedFile.name}</p>) : 
        (<p> Choose a file or click to select</p>)
        }
      </div>
      <form method='POST' encType='multipart/form-data'>
      <input
        type="file"
        name="fileUpload"
        onChange={handleFileSelect}
        style={{ display: 'none' }}
        ref={fileInputRef} // Set the ref to the file input element
      />
      <button type='submit' onClick={handleUpload} className='upload-btn'>Upload</button>
      </form> 
    </div>
  );
}

export default Upload;

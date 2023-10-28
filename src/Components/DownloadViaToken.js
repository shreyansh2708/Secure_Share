import React, { useState } from 'react';
import "./DownloadViaToken.css";

function DownloadViaToken() {
  const[tokenData, setTokenData] = useState();
  const[file, setFile] = useState();
  const handleInputChange = (e) => {
    setTokenData(e.target.value);
  }
  const getFile = (e) => {
    e.preventDefault();
      //sending the file to the server
      fetch('http://localhost:8000/downloadViaToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: tokenData }),
        
      })
      setFile(tokenData);
  }

  return (
    <div className='token-container'>
        <div className='input-container'>
          <form method='POST'  encType='multipart/form-data'>
            <h1 className='tokenNum'>Enter Token:</h1>
            <input className='input-token' onChange={handleInputChange} type='text' placeholder='Enter token'></input>
            <button type='submit' onClick={getFile} className='get-btn'>Get File</button>
          </form>
        </div>
        <div className='center-div'>
        {file ? (
            <a href="/pdfs/decrypted.pdf" download="pdfs/decrypted.pdf">Download</a>
            ) : (
          <p>No file selected.</p>
        )}
        </div>
    </div>
  )
}

export default DownloadViaToken;
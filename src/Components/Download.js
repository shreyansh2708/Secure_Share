import React, { useState } from 'react';
import "./Download.css";
import { useNavigate } from 'react-router';
function Download() {
    const[randomToken, setRandomToken] = useState();
    const navigate = useNavigate();

    const generateToken = () => {
      fetch('http://localhost:8000/download')
      .then((response) => response.json())
      .then((data) => {
        setRandomToken(data.token);
      // console.log(data.token);
      })
      .catch((error) => {
        console.error('Error fetching random token:', error);
      });
    };

    const getFile = (e) => {
      e.preventDefault();
      navigate("/downloadViaToken")
    }

  return (
    <div className='top-container-download'>
      <div>
        <button type='submit' onClick={generateToken} className='btn'>Get Token</button>
        <p className='random-token'>Token Number: {randomToken}</p>
      </div>
      <div>
        <button type='submit' onClick={getFile} className='btn'>Download the File</button>
      </div>      
    </div>
    
  )
}

export default Download;
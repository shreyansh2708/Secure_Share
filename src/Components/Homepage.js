import React from 'react';
import "./Homepage.css";
import { useNavigate } from 'react-router';
function Homepage() {
    const navigate = useNavigate();

    const upload = (e) => {
        e.preventDefault();
        navigate("/upload");
    }

    const download = (e) => {
        e.preventDefault();
        navigate("/downloadViaToken");
    }

  return (
    <div className='top-container'>
        <div>
            <button onClick={upload} className='btn-up'>Upload a File</button>
        </div>
        <div>
            <button type='submit' onClick={download} className='btn-down'>Download a File</button>
        </div>
    </div>
  )
}

export default Homepage;
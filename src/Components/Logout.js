import React from 'react';
import "./Logout.css"
import { auth } from '../firebase';
import { useNavigate } from 'react-router';

function Logout() {
    const navigate = useNavigate();
    const handleLogout = async() => {
      try {
        await auth.signOut();
      } catch (error) {
        console.error("Logout failed:", error.message);
      }
      navigate("/")
    }
  return (
    <div>
        <button onClick={handleLogout} className='logout-button'>Logout</button>
    </div>
  )
}

export default Logout
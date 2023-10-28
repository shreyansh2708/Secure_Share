import React from 'react';
import "./StartRoute.css"
import Header from '../Header';
import Login from '../Login';

function StartRoute() {
  return (
    <div className='start'>
        <Header />
        <Login />
    </div>
  )
}

export default StartRoute
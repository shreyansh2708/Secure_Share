import React from 'react';
import Header from '../Header';
import Logout from '../Logout';
import Homepage from '../Homepage';
import "./HomeRoute.css"
function HomeRoute() {
  return (
    <div className='home'>
        <Header />
        <Logout />
        <Homepage />
    </div>
  )
}

export default HomeRoute;
import React from 'react';
import "./DownloadRoute.css";
import Header from '../Header';
import Logout from '../Logout';
import Download from '../Download';

function DownloadRoute() {
  return (
    <div className='dwnld'>
        <Header />
        <Logout />
        <Download />
    </div>
  )
}

export default DownloadRoute
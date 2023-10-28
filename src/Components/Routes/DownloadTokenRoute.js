import React from 'react';
import "./DownloadTokenRoute.css";
import Header from '../Header';
import Logout from '../Logout';
import DownloadViaToken from '../DownloadViaToken';

function DownloadTokenRoute() {
  return (
    <div className='tokenroute'>    
        <Header />
        <Logout />
        <DownloadViaToken />
    </div>
  )
}
export default DownloadTokenRoute;
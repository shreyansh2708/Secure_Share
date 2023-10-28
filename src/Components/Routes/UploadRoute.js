import React from 'react';
import "./UploadRoute.css";
import Header from '../Header';
import Logout from '../Logout';
import Upload from '../Upload';

function UploadRoute() {
  return (
    <div className='up'>
        <Header />
        <Logout />
        <Upload />
    </div>
  )
}

export default UploadRoute
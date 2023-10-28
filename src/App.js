import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeRoute from './Components/Routes/HomeRoute';
import StartRoute from './Components/Routes/StartRoute';
import UploadRoute from './Components/Routes/UploadRoute';
import DownloadTokenRoute from './Components/Routes/DownloadTokenRoute';
import DownloadRoute from './Components/Routes/DownloadRoute';


function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path='/' element={<div><StartRoute /></div>} />
        <Route path='/upload' element={<div><UploadRoute /></div>} />
        <Route path='/download' element={<div><DownloadRoute /></div>} />
        <Route path='/home' element={<div><HomeRoute /></div>} />
        <Route path='/downloadViaToken' element={<div><DownloadTokenRoute /></div>} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import Frontpage from './components/Homepage';
import AnimeHome from './components/AnimeHome';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path='/' element={<AnimeHome />} />
          <Route path='/home' element={<AnimeHome />} />
          <Route path='/anime' element={<AnimeHome />} />
          <Route path='/unlimited' element={<AnimeHome unlimited={true}/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

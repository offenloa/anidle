import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import Frontpage from './components/Homepage'
import AnimeHome from './components/AnimeHome';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path='/' element={<Frontpage />} />
          <Route path='/home' element={<Frontpage />} />
          <Route path='/anime' element={<AnimeHome />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

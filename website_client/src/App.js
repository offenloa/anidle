import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Frontpage from './components/Homepage';
import AnimeHome from './components/AnimeHome';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
    <CssBaseline />
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
    </ThemeProvider>
  );
}

export default App;

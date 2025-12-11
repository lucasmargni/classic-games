import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/home/HomePage';
import SnakeBoard from './components/snake/SnakeBoard';
import Minesweeper from './components/minesweeper/Minesweeper';
import './App.css';

const App = () => {
  return (
    <Router>
        <Routes>
            <Route path='/' element={<HomePage />}/>
            <Route path='/snake' element={<SnakeBoard rows={16} cols={16} />}/>
            <Route path='/minesweeper' element={<Minesweeper rows={16} cols={16} />}/>
        </Routes>
    </Router>
  );
};

export default App;
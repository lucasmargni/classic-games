import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import SnakeBoard from '../snake/components/SnakeBoard';
import './App.css';

const App = () => {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/snake" element={<SnakeBoard row={10} col={10} />}/>
        </Routes>
    </Router>
  );
};

export default App;
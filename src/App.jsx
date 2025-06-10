import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from 'react-bootstrap';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import Home from './pages/Home';
import Favourites from './pages/Favourites';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Container fluid>
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/favourites' element={<Favourites/>}/>
        <Route />
      </Routes>
  </Router>
  </Container>
  );
}

export default App;

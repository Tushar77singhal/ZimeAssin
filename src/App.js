import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Posts from './Pages/Posts';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/posts/:page"  element={<Posts/>} />
      </Routes>
    </Router>
  );
};

export default App;

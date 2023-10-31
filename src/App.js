import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Sandbox1 from './pages/Sandbox1';
import TraverseBFS from './pages/TraverseBFS';
import TraverseDijkstra from './pages/TraverseDijkstra';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/sandbox1" element={ <Sandbox1/> }></Route>
          <Route path="/bfs" element={ <TraverseBFS/> }></Route>
          <Route path="/dijk" element={ <TraverseDijkstra/> }></Route>
          <Route path="/"></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

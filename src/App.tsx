import React from 'react';
import logo from './logo.svg';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Layout />} />
        <Route path='/albumList' element={<Layout />} />
      </Routes>
    </div>
  );
}

export default App;

import React from 'react';
import logo from './logo.svg';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import AlbumList from './components/albumList';

function App() {
  return (
    <div className="App">
      <AppProvider>
        <Routes>
          <Route path='/' element={<Layout />} >
            <Route path='/albumList' element={<AlbumList />} ></Route>
          </Route>
        </Routes>
      </AppProvider>
    </div>
  );
}

export default App;

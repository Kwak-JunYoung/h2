import React from 'react';
import logo from './logo.svg';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import AlbumList from './components/albumList';
import { AppProvider } from './components/Context';

function App() {
  return (
    <div className="App">
      <AppProvider>
        <Routes>
          <Route path='/' element={<Layout />} >
            <Route path='/albumList' element={<AlbumList />} ></Route>
            <Route path='/albumList/:id' element={<AlbumList />} ></Route>
          </Route>
        </Routes>
      </AppProvider>
    </div>
  );
}

export default App;

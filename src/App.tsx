import React from 'react';
import logo from './logo.svg';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import AlbumList from './components/albumList';
import { AppProvider } from './components/Context';
import Home from './components/Home';
import PictureList from './components/pictureList';

function App() {
  return (
    <div className="App">
      <AppProvider>
        <Routes>
          <Route path='/' element={<Layout />} >
            <Route index element={<Home />} ></Route>
            <Route path='/album' element={<AlbumList />} ></Route>
            <Route path='/album/:id' element={<PictureList />} ></Route>
          </Route>
        </Routes>
      </AppProvider>
    </div>
  );
}

export default App;

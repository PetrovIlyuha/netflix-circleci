import React from 'react';
import Header from './components/Header/Header.jsx';
import './App.scss';
import MainLayout from './components/MainLayout/MainLayout.jsx';

const App = () => {
  return (
    <div className="App">
      <Header />
      <MainLayout />
    </div>
  );
};

export default App;

import React from 'react';
import Header from './components/Header/Header.jsx';
import './App.scss';
import MainLayout from './components/MainLayout/MainLayout.jsx';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const App = () => {
  return (
    <div className="App">
      <Header />
      <Router>
        <Route path="/" exact>
          <MainLayout />
        </Route>
      </Router>
    </div>
  );
};

export default App;

import React from 'react';
import Header from './components/Header/Header.jsx';
import './App.scss';
import MainLayout from './components/MainLayout/MainLayout.jsx';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MovieDetails from './components/content/details/MovieDetails.jsx';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact>
            <MainLayout />
          </Route>
          <Route exact path="/movie/:id">
            <MovieDetails />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;

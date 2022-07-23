import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from './Pages/Home';
import CreateArticle from './Pages/CreateArticle';
import Navbar from './components/Navbar';
import Update from './Pages/Update';

function App() {
  return (

    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route  path="/add">
          <CreateArticle />
        </Route>
        <Route  path="/update/:id">
          <Update />
        </Route>

      </Switch>
    </Router>

  );
}

export default App;

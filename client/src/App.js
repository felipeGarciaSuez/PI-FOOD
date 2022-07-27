import React from 'react';
import './App.css';
import {Route} from "react-router-dom"
import LandingPage  from './components/LandingPage';
import Home  from './components/Home';
import NavBar from './components/NavBar';

function App() {
  return (
    <div className="App">
      <React.Fragment>
        <Route exact path="/" component= {LandingPage}/>
        <Route exact path="/home" component= {Home}/>
        <Route exact path="/home" component= {NavBar}/>
        
        
      </React.Fragment>
    </div>
  );
}

export default App;

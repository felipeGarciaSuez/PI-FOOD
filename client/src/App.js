import React from 'react';
import './App.css';
import {Route} from "react-router-dom"
import LandingPage  from './components/LandingPage';
import Home  from './components/Home';
import RecipeCreator from './components/RecipeCreator';
import RecipeDetail from './components/RecipeDetail';

function App() {
  return (
    <div className="App">
      <React.Fragment>
        <Route exact path="/" component= {LandingPage}/>
        <Route exact path="/home" component= {Home}/>
        <Route exact path="/recipes/" component= {RecipeCreator}/>
        <Route exact path="/recipes/:id" component = {RecipeDetail}/>
        
      </React.Fragment>
    </div>
  );
}

export default App;

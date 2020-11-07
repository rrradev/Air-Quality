import React from 'react';
import NavBar from './components/NavBar';
import MainPanel from './components/MainPanel';
import NotFound from './components/NotFound';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App = () => {

    return(
    <Router>
        <div className="app">
            <NavBar />
            <Switch>
                <Route path="/" exact component={MainPanel}/>
                <Route component={NotFound} />
            </Switch>
        </div>
    </Router>   
    );
}

export default App;
import React from 'react';
import NavBar from './components/NavBar';
import MainPanel from './components/MainPanel';
import './App.css';

function App() {

    return(
        <div className="app">
            <NavBar />
            <MainPanel />   
        </div>
    );
}

export default App;
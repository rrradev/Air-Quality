import React from 'react';
import NavBar from './components/NavBar';
import ChartArea from './components/ChartArea';
import './App.css';

function App() {

    return(
        <div className="app">
            <NavBar />
            <ChartArea />   
        </div>
    );
}

export default App;
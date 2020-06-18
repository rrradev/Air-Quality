import React from 'react';
import PmChart from './components/PmChart';
import LineChart from './components/LineChart'


function App() {

    return(
        <div>
            <PmChart />
            <LineChart name="Temperature" 
                color="rgba(240, 52, 52, 1)" 
                id="temp"
            />
            <LineChart name="Humidity"
                color="rgba(30, 139, 195, 1)"
                id="hum"
            />
        </div>
    );
}

export default App;
import React, {useEffect, useState} from 'react';
import PmChart from './components/PmChart';
import LineChart from './components/LineChart'


function App() {

    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("/api/day-data")
            .then(res => res.json())
            .then(
                (data) => {
                    setData(data);
                }
            )
    }, []);

    return(
        <div>
            <PmChart />
            <LineChart name="Temperature" 
                color="rgba(240, 52, 52, 1)" 
                labels={data.map(item => item.date)}
                values={data.map(item => item.temp)}
            />
            <LineChart name="Humidity"
                color="rgba(30, 139, 195, 1)"
                labels={data.map(item => item.date)}
                values={data.map(item => item.hum)}
            />
        </div>
    );
}

export default App;
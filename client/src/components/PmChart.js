import React, { useEffect, useState} from 'react';
import {Line} from 'react-chartjs-2';

function PmChart(){
    const [error, setError] = useState(false);
    const [values, setValues] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

      useEffect(() => {
        fetch("/api/daily-data")
        .then(res => res.json())
        .then(
            (values) => {
                setIsLoaded(true);
                setValues(values)
        },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
      }, []);
    if(error){
        return <div>Error: {error.message}</div>;       
    } else if(!isLoaded){
        return <div>Loading...</div>;
    } else{
        return( 
            <div className="App" style = {
                {position: "relative",
                 height:1000, 
                 width:1000}}>
                    <h1>PM Day Chart</h1>
                        <Line options = {{
                            responsive: true,
                         }}
                            data = {getChartData(values)}
                        />
             </div>
        );
    }
}
function getChartData(values){

    var data = {
        labels: values.map(item => 
            new Date(item.date)
                .toLocaleTimeString()),
        datasets:[
            {
                label: "PM 2.5",
                backgroundColor: "rgba(255, 0, 255, 0.75)",
                data: values.map(item => item.pm25)
            },
            {
                label: "PM 10",
                backgroundColor: "rgba(0, 255, 0, 0.75)",
                data: values.map(item => item.pm10)
            }
        ]

    }
    return data;
}
export default PmChart;
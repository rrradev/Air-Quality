import React, {useEffect, useState} from 'react';
import ChartButtons from './ChartButtonGroup';
import {Line} from 'react-chartjs-2';

function LineChart(props){

    const name = props.name;
    const color = props.color;
    const id = props.id;

    const [values, setValues] = useState([]);
    const [error, setError] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    
    
    useEffect(() => {
        fetch("/api/day-data")
        .then(res => res.json())
        .then(
            (values) => {
                setValues(values);
                setIsLoaded(true);
        },
            (error) => {
                setError(error);
                setIsLoaded(true);
            }
        )
      },[]);
    
    if(!isLoaded){
        return(
            <div>Loading...</div>
        );
    } else if(error){
        return(
            <div>Error: {error.message}</div>
        );
    } else {
        return(
            <div className="container-sm border">
                <h3>{props.name} Chart</h3>
                <ChartButtons />
                <Line options={{responsive: true}}
                data={
                    {
                        labels: values.map(item =>
                             new Date(item.date)
                                    .toLocaleTimeString()),
                        datasets:[
                            {
                                label: name,
                                backgroundColor: color,
                                data: values.map(item => item[id])
                            }
                        ]
                    }
                }/>
            </div>
        );
    }

}

export default LineChart;
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
    const [api, setApi] = useState("/api/day-data");
    
    var hadnle = (id) => {
        switch(id){
            case 2:
                setApi("/api/12hour-data");
                break;
            case 3:
                setApi("/api/3hour-data");
                break;
            case 4:
                setApi("/api/hour-data");
                break;
            default:
                setApi("/api/day-data");        
        }
    }
    useEffect(() => {
        fetch(api)
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
      },[api]);
    
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
                <ChartButtons api={hadnle}/>
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
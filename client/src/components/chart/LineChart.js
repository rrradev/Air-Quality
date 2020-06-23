import React, {useEffect, useState} from 'react';
import ChartButtons from './ChartButtonGroup';
import {Line} from 'react-chartjs-2';
import { Spinner, Container, Row, Col} from 'reactstrap';

function LineChart(props){ 

    const [values, setValues] = useState([]);
    const [error, setError] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [api, setApi] = useState("/api/day-data");
    
    const handleAPI = (id) => {
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

    const getDatasets = () => {
        var datasets = [];

        for(let i = 0; i < props.datasets.length; i++){
            datasets.push(
                {
                    label: props.datasets[i].label,
                    backgroundColor: props.datasets[i].color,
                    data: values.map(item => item[props.datasets[i].id])
                }
            );
        }
        return datasets;
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
    
    if(error){
        return(
            <div>Error: {error.message}</div>
        );
    } else {
        return(
            <Container> 
                <Row>
                    <h4>{props.name} chart</h4>

                </Row>  
                <Row>
                     <ChartButtons api={handleAPI}/>
                    {!isLoaded &&
                    <span className="ml-3">
                        <Spinner color="primary" />
                    </span>
                    }   
                </Row>
                <Row>
                    <Line options={
                        {responsive: true}
                    }
                    height="125%"
                    data={
                        {
                            labels: values.map(item =>
                                new Date(item.date)
                                        .toLocaleTimeString()),
                            datasets: getDatasets()
                        }
                    }/>
                </Row>
            </Container>
        );
    }
}

export default LineChart;
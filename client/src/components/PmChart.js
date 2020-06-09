import React, { useEffect, useState} from 'react';
import {Line} from 'react-chartjs-2';
import {Button, ButtonGroup, Row, Col} from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

function PmChart(){
    const [error, setError] = useState(false);
    const [values, setValues] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [url, setUrl] = useState('/api/day-data')
    
    const getChartData = () => {
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
      useEffect(() => {
        fetch(url)
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
      },[url]);
    if(error){
        return <div>Error: {error.message}</div>;       
    } else if(!isLoaded){
        return <div>Loading...</div>;
    } else{
        return( 
            <div className="container-sm border">
                    <h3>Particulate matter chart</h3>
                    <Row>  
                        <Col>                  
                        <ButtonGroup>
                            <Button onClick={() => setUrl('/api/day-data')}>24h</Button>{' '}
                            <Button onClick={() => setUrl('/api/12hour-data')}>12h</Button>{' '}
                            <Button onClick={() => setUrl('/api/3hour-data')}>3h</Button>{' '}
                            <Button onClick={() => setUrl('/api/hour-data')}>1h</Button>{' '}
                        </ButtonGroup>
                        </Col>
                    </Row>
                    <Line options = {{
                        responsive: true,
                    }}
                        data = {getChartData(values)}
                    />
             </div>
        );
    }
}
export default PmChart;
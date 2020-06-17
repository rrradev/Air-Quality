import React, { useEffect, useState} from 'react';
import {Line} from 'react-chartjs-2';
import {Button, ButtonGroup, Row, Col} from 'reactstrap'

function PmChart(){
    const [error, setError] = useState(false);
    const [values, setValues] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [api, setApi] = useState('/api/day-data');
    const [toggledButton, setToggledButton] = useState(1);
    
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
    const handleClick = (id) => {   
            switch(id){  
                case 2:
                    setApi('/api/12hour-data');
                    break;  
                case 3:
                     setApi('/api/3hour-data');
                    break;
                case 4:
                    setApi('/api/hour-data');
                    break;  
                default: 
                    setApi('/api/day-data');
            }
            setToggledButton(id);      
    }    
    useEffect(() => {
        fetch(api)
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
      },[api]);
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
                            <Button onClick={ev => handleClick(1)}   
                                    active = {(toggledButton===1)}
                            >24h</Button>{' '}
                            <Button onClick={ev => handleClick(2)}   
                                    active = {(toggledButton===2)}
                            >12h</Button>{' '}
                            <Button onClick={ev => handleClick(3)}   
                                    active = {(toggledButton===3)}
                            >3h</Button>{' '}
                            <Button onClick={ev => handleClick(4)}   
                                    active = {(toggledButton===4)}
                            >1h</Button>{' '}
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
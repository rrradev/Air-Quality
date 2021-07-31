import React, { useEffect, useState } from 'react';
import ChartButtons from './ChartButtonGroup';
import { Line } from 'react-chartjs-2';
import { Spinner, Container, Row, Col } from 'reactstrap';
import LoadingOverlay from 'react-loading-overlay';
import './LineChart.css';

function LineChart(props){ 

    const [api, setAPI] = useState("/api/day-data");
    const [range, setRange] = useState("day");
    const [labelTimeUnit, setLabelTimeUnit] = useState("minute");

    var abortController = new AbortController();
    var worker;
    
    const toggledButton = (buttonId) => {
        switch(buttonId){
            case 1:
                setAPI("/api/week-data");
                setRange("week");
                setLabelTimeUnit("day");
                break;
            case 3:
                setAPI("/api/12hour-data");
                setRange("12 hours");
                setLabelTimeUnit("minute");
                break;
            case 4:
                setAPI("/api/3hour-data");
                setRange("3 hours");
                setLabelTimeUnit("minute");
                break;
            case 5:
                setAPI("/api/hour-data");
                setRange("hour");
                setLabelTimeUnit("minute");
                break;
            case 6:
                setAPI("/api/month-data");
                setRange("month");
                setLabelTimeUnit("day");
                break;
            default:
                setAPI("/api/day-data");  
                setRange("day");
                setLabelTimeUnit("minute");      
        }
        setIsLoaded(false);
        abortController.abort();
        abortController = new AbortController();

        if(worker) {
            worker.terminate();
        }
    }

    const [error, setError] = useState(false);
    const [chartData, updateChartData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        fetch(api, { signal: abortController.signal })
        .then(res => res.json())
        .then(
            (values) => {
                if(window.Worker){
                    worker = new Worker('./webWorkers/chartWorker.js');
                    worker.postMessage({values, props});

                    worker.onmessage = (ev) => {          
                        updateChartData(ev.data);
                        worker.terminate();
                        setIsLoaded(true);
                    }

                    worker.onerror = () => {
                        worker.terminate();
                    }
                }                        
            },
            (error) => {
                if(error.name === "AbortError"){
                    return;
                } else {
                    setError(error);
                    setIsLoaded(true);
                }
            }
        );
      },[api]);
   
    if(error){
        return(
            <div>Error: {error.message}</div>
        );
    } else {
        return(
            <Container>  {/* ;( */}
                <Container className="chart-container">
                    
                    <Row>
                        <Col>
                            <div className="title">
                                <div className="title-text">
                                    {props.name + " over the last " + range}
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="buttons">
                            <ChartButtons toggled={toggledButton} /> 
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <LoadingOverlay 
                                active={!isLoaded}
                                fadeSpeed={0}
                                spinner={
                                    <Spinner color="primary" />
                                }
                                styles={{
                                    overlay: (base) => ({
                                    ...base,
                                    background: "rgba(255,255,255,0)"
                                    })
                                }}
                                >       
                                <Line height={230}
                                    redraw = {false}
                                    options={
                                        {                     
                                            tooltips: {
                                                intersect: false,
                                            },
                                            responsive: true,
                                            maintainAspectRatio: false,
                                            scales: {
                                                xAxes:[{
                                                    ticks:{
                                                        display: true,
                                                        autoSkip: true,
                                                        maxTicksLimit: 6,
                                                        maxRotation: 0,
                                                        minRotation: 0,
                                                    },
                                                    type: "time",
                                                    distribution: 'series',
                                                    time: {
                                                        tooltipFormat: 'HH:mm MMM DD',
                                                        unit: labelTimeUnit,
                                                        displayFormats: {
                                                            minute: "HH:mm",
                                                        },
                                                    }
                                                },],
                                                yAxes:[{
                                                    ticks:{
                                                        display: true,
                                                        autoSkip: true,
                                                        maxTicksLimit: 7,
                                                        maxRotation: 0,
                                                        minRotation: 0
                                                    }
                                                }],
                                            },
                                            animation: {
                                                duration: 200,
                                                numSteps: 7,
                                                easing: "easeOutQuart"
                                            }
                                        }
                                    }
                                    data={isLoaded? chartData : {
                                        datasets:[
                                            { label: "Loading..." }
                                        ]
                                    }}
                                /> 
                            </LoadingOverlay>
                        </Col> 
                    </Row>
                </Container>  
            </Container>
        );
    }
}

export default LineChart;
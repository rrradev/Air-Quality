import React, {useEffect, useState} from 'react';
import ChartButtons from './ChartButtonGroup';
import { Line } from 'react-chartjs-2';
import { Spinner, Container, Row, Col } from 'reactstrap';
import LoadingOverlay from 'react-loading-overlay';
import './LineChart.css';

function LineChart(props){ 

    const [values, setValues] = useState([]);
    const [error, setError] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [api, setApi] = useState("/api/day-data");
    const [range, setRange] = useState("day");
    const [labels, setLabels] = useState([]);
    const [labelTimeUnit, setLabelTimeUnit] = useState("minute");
    
    const handleAPI = (id) => {
        setValues([]);
        switch(id){
            case 1:
                setApi("/api/week-data");
                setRange("week");
                setLabelTimeUnit("day");
                break;
            case 3:
                setApi("/api/12hour-data");
                setRange("12 hours");
                setLabelTimeUnit("minute");
                break;
            case 4:
                setApi("/api/3hour-data");
                setRange("3 hours");
                setLabelTimeUnit("minute");
                break;
            case 5:
                setApi("/api/hour-data");
                setRange("hour");
                setLabelTimeUnit("minute");
                break;
            default:
                setApi("/api/day-data");  
                setRange("day");
                setLabelTimeUnit("minute");      
        }
        setIsLoaded(false);
    }

    const getDatasets = () => {
        var datasets = [];

        for(let i = 0; i < props.datasets.length; i++){
            datasets.push(
                {  
                    label: props.datasets[i].label,
                    backgroundColor: props.datasets[i].color,
                    data: values.map(item => item[props.datasets[i].id]),
                    pointRadius: 0
                }
            );
        }
        return datasets;
    }  


    const getLabels = async () => {
        return Promise.all(values
            .map(value => value.date));
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

      useEffect(() => {
            getLabels()
            .then(labels => {
                setLabels(labels);
            });
      },[values]);

    
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
                            <h5 className="title">
                                {props.name + 
                                " over the last " + 
                                range}</h5>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="buttons">
                            <ChartButtons api={handleAPI} /> 
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
                                    background: "rgba(255,255,255,0.5)"
                                    })
                                }}
                                >       
                                <Line height={230}
                                    redraw
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
                                                    maxTicksLimit: 7,
                                                    maxRotation: 0,
                                                    minRotation: 0,
                                                },
                                                type: "time",

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
                                            duration: 500,
                                            numSteps: 7,
                                            easing: "easeOutQuart"
                                        }
                                    }
                                }
                                    data={{
                                        labels: labels,
                                        datasets: getDatasets()
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
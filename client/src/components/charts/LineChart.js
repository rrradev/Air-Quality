import React, { useEffect, useState } from 'react';
import ChartButtons from './ChartButtonGroup';
import { Line } from 'react-chartjs-2';
import { Spinner, Container, Row, Col } from 'reactstrap';
import LoadingOverlay from 'react-loading-overlay';
import './LineChart.css';
import { fetchCachedData } from '../../services/dataFetcher';
import { DATA_FETCH_INTERVAL_MS } from '../../config/constants';

const USER_SWITCH_RANGE_MSG = "User switched time range";

function LineChart(props) {

    const [endpoint, setEndpoint] = useState("/api/data?hours=24");
    const [range, setRange] = useState("day");
    const [labelTimeUnit, setLabelTimeUnit] = useState("minute");

    const gridLines = {
        display: true,
        color: 'grey',
        lineWidth: 0.5
    }

    var abortController = new AbortController();
    var worker;

    const toggleButton = (buttonId) => {
        switch (buttonId) {
            case 1:
                setEndpoint("/api/data?days=7&groupByHour=true");
                setRange("week");
                setLabelTimeUnit("day");
                break;
            case 3:
                setEndpoint("/api/data?hours=12");
                setRange("12 hours");
                setLabelTimeUnit("minute");
                break;
            case 4:
                setEndpoint("/api/data?hours=3");
                setRange("3 hours");
                setLabelTimeUnit("minute");
                break;
            case 5:
                setEndpoint("/api/data?hours=1");
                setRange("hour");
                setLabelTimeUnit("minute");
                break;
            case 6:
                setEndpoint("/api/data?days=30&groupByHour=true");
                setRange("month");
                setLabelTimeUnit("day");
                break;
            default:
                setEndpoint("/api/data?hours=24");
                setRange("day");
                setLabelTimeUnit("minute");
        }
    }

    const [chartData, updateChartData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const fetchData = async () => {
        abortController.abort(USER_SWITCH_RANGE_MSG);
        abortController = new AbortController();

        if (worker) {
            worker.terminate();
        }

        const fetchPromise = fetchCachedData(endpoint, abortController.signal)
            .then(
                (values) => {
                    if (window.Worker) {
                        worker = new Worker('./webWorkers/chartWorker.js');
                        worker.postMessage({ values, props });

                        worker.onmessage = (ev) => {
                            updateChartData(ev.data);
                            worker.terminate();
                            setTimeout(() => setIsLoaded(true), 150);
                        }

                        worker.onerror = () => {
                            worker.terminate();
                        }
                    }
                },
            )
            .catch(err => {
                const reason = err?.message || err;
                if (reason == USER_SWITCH_RANGE_MSG) {
                    return;
                } else {
                    console.error(err);
                }
            });

        const raceResult = await Promise.race([
            fetchPromise,
            new Promise((resolve) =>
                setTimeout(() => resolve({ type: 'timeout' }), 50)
            )
        ]);

        if (raceResult.type == "timeout") {
            setIsLoaded(false);
        }

        await fetchPromise;
    }

    useEffect(() => {
        fetchData();

        const interval = setInterval(() => {
            fetchData();
        }, DATA_FETCH_INTERVAL_MS);

        return () => clearInterval(interval);
    }, [endpoint]);

    return (
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
                        <ChartButtons toggled={toggleButton} />
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
                                    backgroundColor: "rgba(255,255,255,0)",
                                })
                            }}
                        >
                            <Line height={230}
                                redraw={false}
                                options={
                                    {
                                        tooltips: {
                                            intersect: false,
                                        },
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        scales: {
                                            xAxes: [{
                                                ticks: {
                                                    display: true,
                                                    autoSkip: true,
                                                    maxTicksLimit: 7,
                                                    maxRotation: 25,
                                                    minRotation: 25,
                                                },
                                                type: "time",
                                                distribution: 'series',
                                                time: {
                                                    tooltipFormat: 'HH:mm MMM DD',
                                                    unit: labelTimeUnit,
                                                    displayFormats: {
                                                        minute: "HH:mm",
                                                    },
                                                },
                                                gridLines
                                            }],
                                            yAxes: [{
                                                ticks: {
                                                    display: true,
                                                    autoSkip: true,
                                                    maxTicksLimit: 7,
                                                    maxRotation: 0,
                                                    minRotation: 0
                                                },
                                                gridLines
                                            }],
                                        },
                                        animation: {
                                            duration: 420,
                                            numSteps: 7,
                                            easing: "easeOutQuart"
                                        }
                                    }
                                }
                                data={isLoaded ? chartData : {
                                    labels: [],
                                    datasets: [
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

export default LineChart;
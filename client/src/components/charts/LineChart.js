import React, { useEffect, useState, useRef } from 'react';
import ChartButtons from './ChartButtonGroup';
import { Line } from 'react-chartjs-2';
import { Spinner, Container, Row, Col } from 'reactstrap';
import LoadingOverlay from 'react-loading-overlay';
import './LineChart.css';
import { fetchCachedData } from '../../services/dataFetcher';
import { DATA_FETCH_INTERVAL_MS } from '../../config/constants';
import { BUTTON_IDS } from '../../config/chartButtonIds';

const USER_SWITCH_RANGE_MSG = "User switched time range";

function LineChart(props) {

    const [endpoint, setEndpoint] = useState("/api/data?hours=24");
    const [chartData, updateChartData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const range = useRef("day");
    const labelTimeUnit = useRef("minute");
    const tooltipFormat = useRef("HH:mm MMM DD");
    const autoFetchRange = useRef(false);

    const gridLines = {
        display: true,
        color: 'grey',
        lineWidth: 0.5
    }

    var abortController = new AbortController();
    var worker;

    const toggleButton = (buttonId) => {
        switch (buttonId) {
            case BUTTON_IDS.HOUR_1:
                range.current = "hour";
                labelTimeUnit.current = "minute";
                tooltipFormat.current = "HH:mm MMM DD";
                autoFetchRange.current = true;
                setEndpoint("/api/data?hours=1");
                break;
            case BUTTON_IDS.HOUR_3:
                range.current = "3 hours";
                labelTimeUnit.current = "minute";
                tooltipFormat.current = "HH:mm MMM DD";
                autoFetchRange.current = true;
                setEndpoint("/api/data?hours=3");
                break;
            case BUTTON_IDS.HOUR_12:
                range.current = "12 hours";
                labelTimeUnit.current = "minute";
                tooltipFormat.current = "HH:mm MMM DD";
                autoFetchRange.current = true;
                setEndpoint("/api/data?hours=12");
                break;
            case BUTTON_IDS.WEEK:
                range.current = "week";
                labelTimeUnit.current = "day";
                tooltipFormat.current = "HH:mm MMM DD";
                autoFetchRange.current = false;
                setEndpoint("/api/data?days=7");
                break;
            case BUTTON_IDS.MONTH:
                range.current = "month";
                labelTimeUnit.current = "day";
                tooltipFormat.current = "HH:mm MMM DD";
                autoFetchRange.current = false;
                setEndpoint("/api/data?days=30&groupByHour=true");
                break;
            case BUTTON_IDS.MONTH_3:
                range.current = "3 months";
                labelTimeUnit.current = "day";
                tooltipFormat.current = 'HH:mm MMM DD';
                autoFetchRange.current = false;
                setEndpoint("/api/data?days=90&groupByHour=true");
                break;
            case BUTTON_IDS.MONTH_6:
                range.current = "6 months";
                labelTimeUnit.current = "day";
                tooltipFormat.current = 'MMM DD YYYY';
                autoFetchRange.current = (false);
                setEndpoint("/api/data?days=180&groupByDay=true");
                break;
            case BUTTON_IDS.YEAR_1:
                range.current = "year";
                labelTimeUnit.current = "day";
                tooltipFormat.current = 'MMM DD YYYY';
                autoFetchRange.current = false;
                setEndpoint("/api/data?days=365&groupByDay=true");
                break;
            default:
                range.current = "day";
                labelTimeUnit.current = "minute";
                tooltipFormat.current = "HH:mm MMM DD";
                autoFetchRange.current = true;
                setEndpoint("/api/data?hours=24");
        }
    }

    const fetchData = (reason = "auto") => {

        if (reason !== "auto") {
            setIsLoaded(false);
        }

        abortController.abort(USER_SWITCH_RANGE_MSG);
        abortController = new AbortController();

        if (worker) {
            worker.terminate();
        }

        fetchCachedData(endpoint, abortController.signal)
            .then(
                (values) => {
                    if (window.Worker) {
                        worker = new Worker('./webWorkers/chartWorker.js');
                        worker.postMessage({ values, props });

                        worker.onmessage = (ev) => {
                            updateChartData(ev.data);
                            worker.terminate();
                            setTimeout(() => setIsLoaded(true), 250);
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
    }

    useEffect(() => {
        fetchData("range switch");

        const interval = setInterval(() => {
            if (autoFetchRange.current) fetchData();
        }, DATA_FETCH_INTERVAL_MS);

        return () => clearInterval(interval);
    }, [endpoint]);

    return (
        <Container>
            <Container className="chart-container">
                <Row>
                    <Col>
                        <div className="title">
                            <div className="title-text">
                                {props.name + " over the last " + range.current}
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
                                                    tooltipFormat: tooltipFormat.current,
                                                    unit: labelTimeUnit.current,
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
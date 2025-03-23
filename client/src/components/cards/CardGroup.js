import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from "reactstrap";
import StatCard from './StatCard';
import { DATA_FETCH_INTERVAL_MS } from '../../config/constants';

function CardArea({ notify, dismissToast }) {
    const [values, setValues] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const defaultText = "----";

    const getValidPM = (pm) => {
        pm = parseFloat(pm).toFixed(1);

        return pm > 99.9 ? Math.round(pm) : pm;
    }

    const fetchData = () => {
        fetch("/api/data")
            .then(res => {
                if (!res.ok) {
                    throw new Error(res.status + " " + res.statusText);
                }
                return res.json();
            })
            .then(
                (values) => {
                    if (Object.keys(values).length !== 0) {
                        setValues(values);
                        setIsLoaded(true);
                        dismissToast();
                    } else {
                        throw new Error("No recent data");
                    }
                }
            ).catch(error => {
                notify(error);
                setIsLoaded(false);
            });
    }

    useEffect(() => {
        fetchData();

        const interval = setInterval(() => {
            fetchData();
        }, DATA_FETCH_INTERVAL_MS);

        return () => clearInterval(interval);
    }, []);

    return (
        <Container
            style={{
                marginBottom: "20px"
            }}>
            <Row>
                <Col lg="3" sm="6">
                    <StatCard title="PM25"
                        id="pm25"
                        text={isLoaded ? getValidPM(values.pm25) + " µg/㎥" : defaultText}
                        imgURL="/icons/gas.png" />
                </Col>
                <Col lg="3" sm="6">
                    <StatCard title="PM10"
                        id="pm10"
                        text={isLoaded ? getValidPM(values.pm10) + " µg/㎥" : defaultText}
                        imgURL="/icons/gas.png" />
                </Col>
                <Col lg="3" sm="6">
                    <StatCard title="Temperature"
                        id="temp"
                        text={isLoaded ? values.temp + " °C" : defaultText}
                        imgURL="/icons/termometer.png" />
                </Col>
                <Col lg="3" sm="6">
                    <StatCard title="Humidity"
                        id="hum"
                        text={isLoaded ? values.hum + " %" : defaultText}
                        imgURL="/icons/humidity.png" />
                </Col>
            </Row>
        </Container>
    );
}

export default CardArea;
import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from "reactstrap";
import StatCard from './StatCard';

function CardArea(props) {
    const [values, setValues] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const defaultText = "----";

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
                    } else {
                        props.error(new Error("No recent data ;("));
                    }
                },
                (error) => {
                    props.error(error);
                }
            );
    }

    useEffect(() => {
        fetchData();

        const interval = setInterval(() => {
            fetchData();
        }, 10 * 60 * 1000);

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
                        text={isLoaded ? values.pm25 + " µg/㎥" : defaultText}
                        imgURL="/icons/gas.png" />
                </Col>
                <Col lg="3" sm="6">
                    <StatCard title="PM10"
                        id="pm10"
                        text={isLoaded ? values.pm10 + " µg/㎥" : defaultText}
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
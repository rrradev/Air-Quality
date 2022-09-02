import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from "reactstrap";
import StatCard from './StatCard';

function CardArea() {
    const [values, setValues] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(false);

    const defaultText = "----";

    useEffect(() => {
        fetch("/api/data")
            .then(res => res.json())
            .then(
                (values) => {
                    setValues(values);
                    setIsLoaded(true);
                },
                (error) => {
                    setError(error);
                }
            )
    }, []);

    if (!error) {
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
    else {
        return (
            <div />
        );
    }
}
export default CardArea;
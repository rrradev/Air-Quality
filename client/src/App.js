import React from 'react';
import LineChart from './components/LineChart';
import {Container, Row, Col, Navbar} from 'reactstrap';
import NavBar from './components/NavBar';

function App() {

    return(
        <div>
            <NavBar />
            <Container className>
                <LineChart name="Particulate matter"
                    datasets={[
                        {
                            id: "pm25",
                            color: "rgb(255,0,255)",
                            label: "PM25"
                            
                        },
                        {
                            id: "pm10",
                            color: "rgba(0, 230, 64, 1)",
                            label: "PM10"
                            
                        }
                    ]}
                />
                <LineChart name="Temperature"
                    datasets={[
                        {
                            id: "temp",
                            color: "rgba(240, 52, 52, 1)",
                            label: "Temperature"
                            
                        }
                    ]}
                />
                <LineChart name="Humidity"
                    datasets={[
                        {
                            id: "hum",
                            color: "rgba(30, 139, 195, 1)",
                            label: "Humidity"
                        }
                    ]}
                />
            </Container>
        </div>
    );
}

export default App;
import React from 'react';
import NavBar from './components/NavBar';
import ChartArea from './components/ChartArea'
import { Card, Container } from 'reactstrap';

function App() {

    return(
        <div>
            <NavBar />
            <Container>
                <ChartArea />
            </Container>
        </div>
    );
}

export default App;
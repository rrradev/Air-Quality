import React from 'react';
import logo from './404.png';
import { Container } from 'reactstrap';
import './NotFound.css';

const NotFound = () => {

    return (
        <Container className="not-found">
            <img src={logo} className="logo"/> 
            <div className="error-message">
                The requested URL was not found.
                <a href="/"> Go to the homepage » </a>
            </div>  
        </Container>
    );

}

export default NotFound;
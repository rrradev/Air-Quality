import React from 'react';
import { Container } from 'reactstrap';
import './NotFound.css';

const NotFound = () => {

    return (
        <Container className="not-found">
            <img src="/icons/404.png" className="logo" alt=""/> 
            <div className="error-message">
                The requested URL was not found.
                <a href="/"> Go to the homepage » </a>
            </div>  
        </Container>
    );

}

export default NotFound;
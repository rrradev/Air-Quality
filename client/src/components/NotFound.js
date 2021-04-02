import React from 'react';
import { Container } from 'reactstrap';

const NotFound = () => {

    return (
        <Container className="not-found">
           <div style={{
                 textAlign: "center",
                 marginTop: "3rem",
                 width: "100%"
           }}>
                <img src="/icons/404.png" className="logo" alt=""
                    style={{
                        width: "50%"
                    }}
                /> 
                <div className="error-message"
                    style={{
                        marginTop: "1.5rem"
                    }}
                >
                    The requested URL was not found.
                    <a href="/"> Go to the homepage » </a>
                </div>  
            </div>
        </Container>
    );

}

export default NotFound;
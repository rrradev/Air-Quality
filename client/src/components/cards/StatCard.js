import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import './StatCard.css';

function StatCard(props) {
    return(
        <Container className="stat-card"
            id={props.id}>
            <Row>
                <Col xs="auto">
                <div style={{
                    textAlign: "left"
            
                }}>
                    <h3 className="card-title">{props.title}</h3>
                    <p className="card-text">{props.text}</p>
                </div>
                </Col>
                <Col>
                    <div style={{
                        textAlign: "right"
                    }}>
                        <img src={props.imgURL} className="image" />

                    </div>
                </Col>
            </Row>
        </Container>
    );
}



export default StatCard;
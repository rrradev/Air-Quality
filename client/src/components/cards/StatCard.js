import React from 'react';
import { Card, CardTitle, CardText, CardImg, CardImgOverlay, Container, Row, Col } from 'reactstrap';
import './StatCard.css';

function StatCard(props) {
    return(
            // <Card className="stat-card"
            //     id={props.id}
            //     inverse>
            //         <CardTitle className="card-title">{props.title}</CardTitle>
            //         <CardText className="card-text">{props.text}</CardText>
            //         <CardImg width="100%" src="/img" alt="Card image cap" />
            // </Card>
        <Container className="stat-card"
            id={props.id}>
            <Row>
                <Col>
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
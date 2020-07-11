import React from 'react';
import { Card, CardTitle, CardText} from 'reactstrap';
import './StatCard.css';

function StatCard(props) {
    return(
            <Card className="stat-card"
                id={props.id}
                inverse>
                    <CardTitle className="card-title">{props.title}</CardTitle>
                    <CardText className="card-text">{props.text}</CardText>
            </Card>

    );
}

StatCard.defaultProps = {
    text: '-----'
  };


export default StatCard;
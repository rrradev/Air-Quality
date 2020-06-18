import React, {useState} from 'react';
import {Button, ButtonGroup} from 'reactstrap';

function ChartButtonGroup(props){
    const [toggledButton, setToggledButton] = useState(1);

    function handleClick(id){
        setToggledButton(Number(id));
        props.api(Number(id));
    }

    return(
            <ButtonGroup>
                  <Button id="1"
                    onClick={ev => handleClick(ev.target.id)}
                    active={(toggledButton === 1)} // ;(
                    >
                    1d
                </Button>
                <Button id="2"
                    active={toggledButton === 2}
                    onClick={ev => handleClick(ev.target.id)}>
                    12h
                </Button>
                <Button id="3"
                    active={toggledButton === 3}
                    onClick={ev => handleClick(ev.target.id)}>
                    3h
                </Button>
                <Button id="4"
                    active={toggledButton === 4}
                    onClick={ev => handleClick(ev.target.id)}>
                    1h
                </Button>
            </ButtonGroup>   
    );
}

export default ChartButtonGroup;
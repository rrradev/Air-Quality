import React, {useState} from 'react';
import { Button, ButtonGroup } from 'reactstrap';

function ChartButtonGroup(props){
    const [toggledButton, setToggledButton] = useState(2);

    function handleClick(id){
        if(id == toggledButton){
            return;
        }

        setToggledButton(Number(id));
        props.toggled(Number(id));
    }

    return(
        <div>
            <ButtonGroup size="sm">
                 <Button id="1"
                    onClick={ev => handleClick(ev.target.id)}
                    active={(toggledButton === 1)}>     
                    1w
                </Button> 
                  <Button id="2"
                    onClick={ev => handleClick(ev.target.id)}
                    active={(toggledButton === 2)}>     
                    1d
                </Button>
                <Button id="3"
                    active={toggledButton === 3}
                    onClick={ev => handleClick(ev.target.id)}>
                    12h
                </Button>
                <Button id="4"
                    active={toggledButton === 4}
                    onClick={ev => handleClick(ev.target.id)}>
                    3h
                </Button>
                <Button id="5"
                    active={toggledButton === 5}
                    onClick={ev => handleClick(ev.target.id)}>
                    1h
                </Button>
            </ButtonGroup>  
        </div> 
    );
}

export default ChartButtonGroup;
import React, { useState } from 'react';
import { Button, ButtonGroup } from 'reactstrap';

function ChartButtonGroup(props){
    const [toggledButtonId, setToggledButtonId] = useState("2");
    const weekButtonId = "1";
    const dayButtonId = "2";
    const $12hourButtonId = "3";
    const $3hourButtonId = "4";
    const hourButtonId = "5";


    function handleClick(id){
        if(id === toggledButtonId){
            return;
        }

        setToggledButtonId(Number(id));
        props.toggled(Number(id));
    }

    return(
        <div>
            <ButtonGroup size="sm">
                 <Button id={weekButtonId}
                    onClick={ev => handleClick(ev.target.id)}
                    active={(toggledButtonId === weekButtonId)}>     
                    1w
                </Button> 
                  <Button id={dayButtonId}
                    onClick={ev => handleClick(ev.target.id)}
                    active={(toggledButtonId === dayButtonId)}>     
                    1d
                </Button>
                <Button id={$12hourButtonId}
                    active={toggledButtonId === $12hourButtonId}
                    onClick={ev => handleClick(ev.target.id)}>
                    12h
                </Button>
                <Button id={$3hourButtonId}
                    active={toggledButtonId === $3hourButtonId}
                    onClick={ev => handleClick(ev.target.id)}>
                    3h
                </Button>
                <Button id={hourButtonId}
                    active={toggledButtonId === hourButtonId}
                    onClick={ev => handleClick(ev.target.id)}>
                    1h
                </Button>
            </ButtonGroup>  
        </div> 
    );
}

export default ChartButtonGroup;
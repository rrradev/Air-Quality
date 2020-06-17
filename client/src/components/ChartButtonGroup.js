import React, {useState} from 'react';
import {Button, ButtonGroup} from 'reactstrap';

function ChartButtonGroup(){
    const [toggledButton, setToggledButton] = useState(1);

    return(
            <ButtonGroup>
                <Button active={toggledButton === 1}
                    onClick={ev => setToggledButton(1)}>
                        24h</Button>

                <Button active={toggledButton === 2}
                    onClick={ev => setToggledButton(2)}>
                        12h</Button>

                <Button active={toggledButton === 3}
                    onClick={ev => setToggledButton(3)}>
                        3h</Button>

                <Button active={toggledButton === 4}
                    onClick={ev => setToggledButton(4)}>
                        1h</Button>
            </ButtonGroup>   
    );
}

export default ChartButtonGroup;
import React, { useState } from 'react';
import { Button, ButtonGroup } from 'reactstrap';
import { BUTTON_IDS } from './buttinIds';

function ChartButtonGroup(props) {
    const [toggledButtonId, setToggledButtonId] = useState(BUTTON_IDS.DAY);

    const rangeButtons = [
        { id: BUTTON_IDS.MONTH, label: '1m' },
        { id: BUTTON_IDS.WEEK, label: '1w' },
        { id: BUTTON_IDS.DAY, label: '1d' },
        { id: BUTTON_IDS.HOUR_12, label: '12h' },
        { id: BUTTON_IDS.HOUR_3, label: '3h' },
        { id: BUTTON_IDS.HOUR_1, label: '1h' }
    ];


    function handleClick(id) {
        if (id === toggledButtonId) {
            return;
        }

        setToggledButtonId(id);
        props.toggled(id);
    }

    return (
        <div>
            <ButtonGroup size="sm">
                {rangeButtons.map(({ id, label }) => (
                    <Button
                        key={id}
                        id={id}
                        onClick={(ev) => handleClick(ev.target.id)}
                        active={toggledButtonId === id}
                    >
                        {label}
                    </Button>
                ))}
            </ButtonGroup>
        </div>
    );
}

export default ChartButtonGroup;
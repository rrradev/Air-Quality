import React, { useState } from 'react';
import {
    Button,
    ButtonGroup,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown
} from 'reactstrap';
import { BUTTON_IDS } from '../../config/chartButtonIds';
import { useExtendedRanges } from '../../context/ExtendedRangesContext';

function ChartButtonGroup(props) {
    const [toggledButtonId, setToggledButtonId] = useState(BUTTON_IDS.DAY);
    const [lastExtendedId, setLastExtendedId] = useState(undefined);

    const { availableExtendedRanges, loading } = useExtendedRanges();

    const rangeButtons = [
        { id: BUTTON_IDS.WEEK, label: '1w' },
        { id: BUTTON_IDS.DAY, label: '1d' },
        { id: BUTTON_IDS.HOUR_12, label: '12h' },
        { id: BUTTON_IDS.HOUR_3, label: '3h' },
        { id: BUTTON_IDS.HOUR_1, label: '1h' }
    ];

    const extendedRanges = [
        { id: BUTTON_IDS.MONTH, label: '1m' },
        { id: BUTTON_IDS.MONTH_3, label: '3m' },
        { id: BUTTON_IDS.MONTH_6, label: '6m' },
        { id: BUTTON_IDS.YEAR_1, label: '1y' },
    ].filter(range => availableExtendedRanges.includes(range.label));

    const handleClick = (id) => {
        if (id === toggledButtonId) return;

        setToggledButtonId(id);

        if (extendedRanges.some(r => r.id === id)) {
            setLastExtendedId(id);
        }

        props.toggled(id);
    };

    return (
        <div>
            <ButtonGroup size="sm">
                {<UncontrolledDropdown>
                    <DropdownToggle
                        caret
                        active={extendedRanges.some(r => r.id === toggledButtonId)}
                        size="sm"
                        color="secondary"
                        disabled={loading || extendedRanges.length === 0}
                    >
                        {loading
                            ? '---'
                            : extendedRanges.find(r => r.id === lastExtendedId)?.label || '---'}
                    </DropdownToggle>
                    <DropdownMenu>
                        {extendedRanges.map(({ id, label }) => (
                            <DropdownItem key={id} onClick={() => handleClick(id)}>
                                {label}
                            </DropdownItem>
                        ))}
                    </DropdownMenu>
                </UncontrolledDropdown>}

                {rangeButtons.map(({ id, label }) => (
                    <Button
                        key={id}
                        id={id}
                        onClick={() => handleClick(id)}
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

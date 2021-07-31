import React from 'react';
import ChartGroup from './charts/ChartGroup';
import CardGroup from './cards/CardGroup';
import NavBar from './NavBar';
import './MainPanel.css';

function MainPanel(props) {

    return (
        <div id="panel">
            <NavBar isBulbOn={props.themeToggler} />
            <CardGroup />
            <ChartGroup />
        </div>
    );
}

export default MainPanel;
import React from 'react';
import ChartGroup from './charts/ChartGroup';
import CardGroup from './cards/CardGroup';

function MainPanel(){

    return(
        <div> 
            <CardGroup />  
            <ChartGroup />
        </div>
    );
}

export default MainPanel;
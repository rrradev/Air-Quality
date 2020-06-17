import React from 'react';
import ChartButtons from './ChartButtonGroup';
import {Line} from 'react-chartjs-2';

function LineChart(props){

    var labels = props.labels;
    var name = props.name;
    var color = props.color;
    var values = props.values;

    return(
        <div className="container-sm border">
        <h3>{props.name} Chart</h3>
        <ChartButtons />
        <Line options={{responsive: true}}
        data={
            {
                labels: labels,
                datasets:[
                    {
                        label: name,
                        backgroundColor: color,
                        data: values
                    }
                ]
            }
        }/>
        </div>
    );
}

export default LineChart;
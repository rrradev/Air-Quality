import React from 'react';
import {Line} from 'react-chartjs-2';

function PmChart(){
    var data = {
        labels: [1,2,3,4,5],
        datasets:[
            {
                label: "PM",
                backgroundColor: "rgba(255, 0, 255, 0.75)",
                data: [100,22,220,334,100]
            }
        ]

    }

    return(  
        <div className="App" style = {{position: "relative", height:500, width:500}}>
             <h1>PM Chart</h1>
            <Line options = {{
                responsive: true,
            }}
                data = {data}
            />
        </div>
    );
}

export default PmChart;
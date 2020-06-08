import React, { useEffect, useState} from 'react';
import {Line} from 'react-chartjs-2';


function PmChart(){
    const [hasError, setErrors] = useState(false);
    const [values, setValues] = useState([]);

    async function fetchData() {
        const res = await fetch("/api/data");
        res
          .json()
          .then(res => setValues(res))
          .catch(err => setErrors(err))
      }
      useEffect(() => {
        fetchData();
      });

  return( 
    <div className="App" style = {{position: "relative", height:1000, width:1000}}>
         <h1>PM Hour Chart</h1>
            <Line options = {{
                  responsive: true,
            }}
                data = {getChartData(values)}
        />
    </div>
  );
}
function getChartData(values){

    var data = {
        labels: values.map(item => (item.date)),
        datasets:[
            {
                label: "PM 2.5",
                backgroundColor: "rgba(255, 0, 255, 0.75)",
                data: values.map(item => (item.pm25))
            },
            {
                label: "PM 10",
                backgroundColor: "rgba(0, 255, 0, 0.75)",
                data: values.map(item => (item.pm10))
            }
        ]

    }
    return data;
}
export default PmChart;
import React from 'react';
import ReactDOM from 'react-dom';
import PmChart from './components/PmChart';
import LineChart from './components/LineChart'
import 'bootstrap/dist/css/bootstrap.min.css'

var data=[
  {
    temp: 25,
    hum: 70,
    date: "Date 1"
  },
  {
    temp:26,
    hum: 71,
    date: "Date 2"
  },
  {
    temp:27,
    hum: 72,
    date: "Date 3"
  },
  {
    temp:28,
    hum: 73,
    date: "Date 4"
  },
  {
    temp:29,
    hum: 74,
    date: "Date 5"
  }
];

ReactDOM.render(
  <React.StrictMode>
    <PmChart />
    <LineChart name="Temperature" 
      color="rgba(240, 52, 52, 1)" 
      labels={data.map(item => item.date)}
      values={data.map(item => item.temp)}
      />
    <LineChart name="Humidity"
      color="rgba(30, 139, 195, 1)"
      labels={data.map(item => item.date)}
      values={data.map(item => item.hum)}
      />

  </React.StrictMode>,
  document.getElementById('root')
);



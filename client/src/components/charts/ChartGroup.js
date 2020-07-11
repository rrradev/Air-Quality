import React from 'react';
import LineChart from './LineChart';

function ChartGroup(){
    return(
        <div>
            <LineChart name="Particulate matter"
                datasets={[
                    {
                        id: "pm25",
                        color: "rgba(145, 61, 136, 1)",
                        label: "PM25 µg/㎥"        
                    },
                    {
                        id: "pm10",
                        color: "rgba(30, 130, 76, 1)",
                        label: "PM10 µg/㎥"           
                    }
                ]}
            />
            <LineChart name="Temperature"
                datasets={[
                    {
                        id: "temp",
                        color: "rgba(192, 57, 43, 1)",
                        label: "Temperature °C"        
                    }
                ]}
            />
            <LineChart name="Humidity"
                datasets={[
                    {
                        id: "hum",
                        color: "rgba(75, 119, 190, 1)",
                        label: "Humidity %"
                    }
                ]}
            />
        </div>
    );
}

export default ChartGroup;
import React from 'react';
import LineChart from './LineChart';

function ChartGroup(){
    return(
        <div>
            <LineChart name="Particulate matter"
                datasets={[
                    {
                        id: "pm25",
                        color: "rgb(129, 31, 119)",
                        label: "PM25 µg/㎥"        
                    },
                    {
                        id: "pm10",
                        color: "rgb(24, 117, 68)",
                        label: "PM10 µg/㎥"           
                    }
                ]}
            />
            <LineChart name="Temperature"
                datasets={[
                    {
                        id: "temp",
                        color: "rgb(158, 46, 34)",
                        label: "Temperature °C"        
                    }
                ]}
            />
            <LineChart name="Humidity"
                datasets={[
                    {
                        id: "hum",
                        color: "rgb(54, 95, 161)",
                        label: "Humidity %"
                    }
                ]}
            />
        </div>
    );
}

export default ChartGroup;
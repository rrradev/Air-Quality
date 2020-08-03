const moment = require('moment');

//not used
const squeeze = (data) => {
    var agrData = [];

    for(let i = 0; i < data.length - 2; i += 2){
        const { pm25, pm10, temp, hum, date } = data[i];
        var pm25_next, pm10_next, temp_next, hum_next, date_next;
        var next = i + 1;
        
        pm25_next = data[next].pm25;
        pm10_next = data[next].pm10;
        temp_next = data[next].temp;
        hum_next = data[next].hum;
        date_next = data[next].date;

        var dateMillis = new Date(date).getTime();
        var dateNextMillis = new Date(date_next).getTime();
        var medianDate = new Date((dateMillis + dateNextMillis) / 2);

        agrData.push({
            pm25: ((pm25 + pm25_next) / 2).toFixed(2),
            pm10: ((pm10 + pm10_next) / 2).toFixed(2),
            temp: ((temp + temp_next) / 2).toFixed(2),
            hum: ((hum + hum_next) / 2).toFixed(2),
            date: medianDate
        });
    }
    return agrData;
}

const squeezeInHourSegments = (data = []) => {
    var agrData = [];

    var startDate = moment(data[0].date);
    var endDate = moment(data[data.length - 1].date);
    var duration = moment.duration(endDate.diff(startDate));
    var totalHours = duration.asHours();
    var currentIndex = 0;
    var hourSegmentDate = startDate;
    
    for(let i = 0; i < totalHours; i++){
        
        let pm25Hourly = 0;
        let pm10Hourly = 0;
        let tempHourly = 0;
        let humHourly = 0;
        let valuesInCurrentHour = 0;
        
        hourSegmentDate.add(1, 'hour');

        hourSegmentDate.set({
            minutes: 0,
            seconds: 0
        });

        while(currentIndex < data.length 
                && moment(data[currentIndex].date)
                    .isBefore(hourSegmentDate)){
                        pm25Hourly += data[currentIndex].pm25;
                        pm10Hourly += data[currentIndex].pm10;
                        tempHourly += data[currentIndex].temp;
                        humHourly += data[currentIndex].hum;
                        valuesInCurrentHour++;
                        currentIndex++;
                    }

        agrData.push({
            pm25: (pm25Hourly / valuesInCurrentHour).toFixed(2),
            pm10: (pm10Hourly / valuesInCurrentHour).toFixed(2),
            temp: (tempHourly / valuesInCurrentHour).toFixed(2),
            hum:  (humHourly / valuesInCurrentHour).toFixed(2),
            date: hourSegmentDate.toISOString()
        });    

    }
    
    return agrData;
}


module.exports = {
    squeezeInHourSegments
}
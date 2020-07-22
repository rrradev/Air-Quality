const moment = require('moment');

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

module.exports = {
    squeeze
}
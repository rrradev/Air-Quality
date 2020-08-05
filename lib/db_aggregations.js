const groupByHourAgg = (startDate) => {
    
    return([
      {
        '$match': {
          'date': {
            '$gte': startDate
          }
        }
      }, {
        '$project': {
          'year': {
            '$year': '$date'
          }, 
          'month': {
            '$month': '$date'
          }, 
          'day': {
            '$dayOfMonth': '$date'
          }, 
          'hour': {
            '$hour': '$date'
          }, 
          '_id': '$_id', 
          'pm25': '$pm25', 
          'pm10': '$pm10', 
          'temp': '$temp', 
          'hum': '$hum', 
          'date': '$date'
        }
      }, {
        '$group': {
          '_id': {
            'h': '$hour', 
            'd': '$day', 
            'm': '$month', 
            'y': '$year'
          }, 
          'pm25': {
            '$avg': '$pm25'
          }, 
          'pm10': {
            '$avg': '$pm10'
          }, 
          'temp': {
            '$avg': '$temp'
          }, 
          'hum': {
            '$avg': '$hum'
          }, 
          'hour': {
            '$avg': '$hour'
          }, 
          'day': {
            '$avg': '$day'
          }, 
          'month': {
            '$avg': '$month'
          }, 
          'year': {
            '$avg': '$year'
          }
        }
      }, {
        '$addFields': {
          'date': {
            '$dateFromParts': {
              'year': '$year', 
              'month': '$month', 
              'day': '$day', 
              'hour': '$hour'
            }
          }, 
          'pm25': {
            '$trunc': [
              '$pm25', 2
            ]
          }, 
          'pm10': {
            '$trunc': [
              '$pm10', 2
            ]
          }, 
          'temp': {
            '$trunc': [
              '$temp', 2
            ]
          }, 
          'hum': {
            '$trunc': [
              '$hum', 2
            ]
          }
        }
      }, {
        '$sort': {
          'date': 1
        }
      }
    ]);
  } 
  
  module.exports = {
      groupByHourAgg
  }
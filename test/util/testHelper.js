const crypto = require('crypto');

const randomData = () => {

    return data = {
        'pm25': crypto.randomInt(1, 100),
        'pm10': crypto.randomInt(1, 100),
        'temp': crypto.randomInt(1, 100),
        'hum': crypto.randomInt(1, 100),
    }
}

module.exports = { randomData }
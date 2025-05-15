const randomData = () => {

    return {
        'pm25': randomFloat(0, 500),
        'pm10': randomFloat(0, 500),
        'temp': randomFloat(-20, 30),
        'hum': randomFloat(0, 100),
    }
}

const randomFloat = (min, max) => {
    const random = Math.random() * (max - min) + min;
    return Math.round(random * 100) / 100;
}

module.exports = { randomData }
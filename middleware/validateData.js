const { hasNaNs, parseAndRound } = require('../lib/util/numeric_utils');

const validateData = (req, res, next) => {
    let { pm25, pm10, temp, hum } = req.body;

    pm25 = parseAndRound(pm25);
    pm10 = parseAndRound(pm10);
    temp = parseAndRound(temp);
    hum = parseAndRound(hum);

    if (hasNaNs(pm25, pm10, temp, hum)) {
        let error = [{
            "error": "Invalid Data."
        }];

        error.push(req.body);

        return res.status(400).json(error);
    }

    if (pm25 < 0 || pm10 < 0 || hum < 0) {
        return res.status(400).json({
            error: "Invalid Data. pm25, pm10, and hum cannot be negative."
        });
    }

    req.body = { pm25, pm10, temp, hum };
    next();
};

module.exports = validateData;

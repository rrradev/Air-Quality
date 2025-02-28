const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { groupByHourPipeline } = require('../../lib/db/db_pipelines');
const Data = require('../../models/Data');
const validateData = require('../../middleware/validateData');

/**
 * @swagger
 * components:
 *  securitySchemes:
 *   ApiKeyAuth:
 *    type: apiKey
 *    in: header  
 *    name: x-auth-token
 * 
 * security:
 *  - ApiKeyAuth: []  
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Data:
 *       type: object
 *       required:
 *         - pm25
 *         - pm10
 *         - temp
 *         - hum
 *       properties:
 *         _id:
 *           type: String
 *           description: Auto-generated id of the sensor data entry
 *         pm25:
 *           type: Number
 *           description: Particulate Matter - 2.5 micrometers and smaller.
 *         pm10:
 *           type: Number
 *           description: Particulate Matter - 10 micrometers and smaller.
 *         temp: 
 *           type: Number
 *           description: Temperature, C
 *         hum:
 *           type: Number
 *           description: Humidity, %
 *         date:
 *            type: Date
 *            description: Auto-generated date of creation
 *         __v:
 *            type: Number
 *            description: Version key
 *       example:
 *         _id: 63134fb957ed91027b5cc970
 *         pm25: 5.5
 *         pm10: 9.1
 *         temp: 26.5
 *         hum: 77
 *         date: 2022-09-03T12:59:37.728Z
 *         __v: 0
 *     Data-Simple:
 *       type: object
 *       example:
 *         pm25: 5.5
 *         pm10: 9.1
 *         temp: 26.5
 *         hum: 77
 */

/** 
 * @swagger 
 * /api/data:
 *   post: 
 *     tags: 
 *      - data controller
 *     summary: Create new sensor data entry
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Data-Simple'
 *     security:
 *      - ApiKeyAuth: []
 *     responses:  
 *       201: 
 *         description: Created
 *       401:
 *         description: Unauthorized
 */
router.post('/', auth, validateData, (req, res) => {
    let { pm25, pm10, temp, hum } = req.body;


    const newData = new Data({
        pm25,
        pm10,
        temp,
        hum,
        date: Date.now()
    });

    newData.save()
        .then(data => res.status(201).json(data));
});

/** 
 * @swagger 
 * /api/data:
 *   get: 
 *     tags: 
 *      - data controller
 *     summary: Get sensor data
 *     description: By default the most recent data entry is returned (1). Getting multiple entires for a given time frame can be controlled via query params
 *     parameters:
 *      - in: query
 *        name: hours
 *        schema:
 *         type: integer
 *         minimum: 1
 *         maximum: 24
 *        description: The sensor data for the past number of hours
 *      - in: query
 *        name: days
 *        schema:
 *         type: integer
 *         minimum: 1
 *         maximum: 10
 *        description: The sensor data for the past number of days. Cancels hours.
 *      - in: query
 *        name: groupByHour 
 *        schema:
 *         type: boolean
 *        description: The average of the sensor data grouped by hour
 *     responses:  
 *       200: 
 *         description: Success
 *         content:
 *          application/json:
 *           schema:
 *            type: array
 *            items:
 *             $ref: '#/components/schemas/Data' 
 */
router.get('/', (req, res) => {
    console.log('GET /api/data');
    console.log(req.query);

    if (Object.keys(req.query).length === 0) {
        const pastHour = new Date(
            new Date().getTime() - (60 * 60 * 1000)
        );

        Data.findOne({ "date": { "$gte": pastHour } })
            .sort({ $natural: -1 })
            .then(data => {
                data = data || [];
                return res.json(data);
            })
            .catch(err => res.status(500).json({}));
        return;
    }

    let { hours, days, groupByHour } = req.query;

    hours = +hours || 1;

    if (days >= 1 || hours > 24) hours = 24;
    if (hours < 0) hours = 1;

    days = +days || 1;

    if (days > 30) days = 30;
    if (days < 1) days = 1;

    const pastDate = new Date(
        new Date().getTime() - (days * hours * 60 * 60 * 1000)
    );

    if (groupByHour === "true") {
        const pipeline = groupByHourPipeline(pastDate);
        Data.aggregate(pipeline)
            .then(data => res.json(data));
    } else {
        Data.find({ "date": { "$gte": pastDate } })
            .then(data => res.json(data));
    }
});

/** 
 * @swagger 
 * /api/data/{id}:
 *   delete:
 *     tags: 
 *      - data controller
 *     summary: Delete data entry
 *     parameters:
 *      - in: path
 *        name: id
 *     security:
 *      - ApiKeyAuth: []
 *     responses:  
 *       200: 
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not Found
 */
router.delete('/:id', auth, (req, res) => {
    Data.deleteOne({ _id: req.params.id })
        .then(result => {
            if (result.deletedCount === 1) {
                res.json(req.params)
            } else {
                throw new Error();
            }
        })
        .catch(err => res.status(404).json(req.params));
})

module.exports = router;

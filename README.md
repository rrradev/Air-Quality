[![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=Swagger&logoColor=white)](https://airqt.herokuapp.com/api-docs)
[![Heroku](https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white)](https://devcenter.heroku.com/articles/getting-started-with-nodejs)
[![NODE](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![EXPRESS](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MONGODB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/cloud)
[![REACT](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/) 
[![CHART-JS](https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white)](https://www.chartjs.org/docs/latest/)\
[![MOCHA](https://img.shields.io/badge/mocha.js-323330?style=for-the-badge&logo=mocha&logoColor=Brown)](https://mochajs.org/)
[![CHAI](https://img.shields.io/badge/chai.js-323330?style=for-the-badge&logo=chai&logoColor=red)](https://www.chaijs.com/plugins/chai-http/)
[![PLAYWRIGHT](https://img.shields.io/badge/Playwright-orange?style=for-the-badge)](https://playwright.dev)

# Air-Quality 
[![CI](https://github.com/rrradev/Air-Quality/actions/workflows/main.yml/badge.svg)](https://github.com/rrradev/Air-Quality/actions/workflows/main.yml) [![Playwright Report](https://custom-icon-badges.demolab.com/badge/Playwright-Report-2EAD33?logo=playwright)](https://rrradev.github.io/Air-Quality/)

A web application that collects air quality data from a [sensor node](https://github.com/radradef/esp32SensorNode "radradef/esp32SensorNode") and visualizes it using charts (particulate matter, temperature and humidity).

Deployed on heroku: https://airqt.herokuapp.com

API documentation: https://airqt.herokuapp.com/api-docs

![Screenshot 2024-12-01 211431](https://github.com/user-attachments/assets/9779f3ab-5461-465f-8652-496f991e9312)

## Running the app in development mode 
 * [![NODE](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org)
 * Set [MongoDB URI](https://www.mongodb.com/docs/manual/reference/connection-string/) in secrets.js (for reference - [secrets_template.js](https://github.com/rrradev/Air-Quality/blob/master/secrets_template.js))
   
1. `npm install`
2. `npm run client-install`
3. `npm run dev`

## Running tests
#### [API](https://github.com/rrradev/Air-Quality/blob/master/test/api/data.test.js)
1. `npm run test:api`

#### [UI](https://github.com/rrradev/Air-Quality/blob/master/client/tests/specs/air-qt.spec.ts)
1. `npm run test:ui`

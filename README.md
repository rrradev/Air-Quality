[![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=Swagger&logoColor=white)](https://airqt.herokuapp.com/api-docs)
[![Heroku](https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white)](https://devcenter.heroku.com/articles/getting-started-with-nodejs)
[![NODE](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![EXPRESS](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MONGODB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/cloud)
[![REACT](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![CHART-JS](https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white)](https://react-chartjs-2.js.org/)

# Air-Quality [![CI](https://github.com/rrradev/Air-Quality/actions/workflows/main.yml/badge.svg)](https://github.com/rrradev/Air-Quality/actions/workflows/main.yml)
Web app that collects air quality metrics from a [sensor node](https://github.com/radradef/esp32SensorNode "radradef/esp32SensorNode") and plots the data on charts (particulate matter, temperature and humidity).

Deployed on heroku: https://airqt.herokuapp.com

API documentation: https://airqt.herokuapp.com/api-docs

![ScreenL](https://user-images.githubusercontent.com/25829240/178979923-c9cccfb7-52bf-40b9-b5e4-313d82b194f1.png)

## Running the app in development mode 
 Set MongoDB URI in secrets.js
1. `npm install`
2. `npm run client-install`
3. `npm run dev`

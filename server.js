const express = require('express');
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;
const data = require('./routes/api/data');
const path = require('path');
const fs = require('fs');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const port = process.env.PORT || 3334;

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'AirQt data API',
      description: 'Managing the data measured by the air quality sensors',
      contact: {
        email: 'rradev@duck.com'
      },
    },
    openapi: "3.0.0",
  },
  apis: ['routes/api/*.js']
}
const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use(express.json());

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("MongoDB connected!"))
  .catch(err => console.log(err));

if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https') {
      res.redirect(`https://${req.header('host')}${req.url}`)
    } else {
      next();
    }
  });
}

app.use('/api/data', data);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const banner = fs.readFileSync(__dirname + "/banner.txt");

const server = app.listen(port, () => {
  console.log(banner.toString());
  console.log(`Server listening at http://localhost:${port}`);
});

module.exports = server;
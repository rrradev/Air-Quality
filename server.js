const express = require('express');
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;
const data = require('./routes/api/data');
const hourData = require('./routes/api/hour-data');
const $3hourData = require('./routes/api/3hour-data');
const $12hourData = require('./routes/api/12hour-data');
const dayData = require('./routes/api/day-data');
const weekData = require('./routes/api/week-data');
const monthData = require('./routes/api/month-data');
const lastRecord = require('./routes/api/last-record');
const path = require('path');

const app = express();
const port = process.env.PORT || 3334;

app.use(express.json());

mongoose
    .connect(db, {
         useNewUrlParser: true,
         useUnifiedTopology: true
        })
    .then(() => console.log("MongoDB connected!"))
    .catch(err => console.log(err));

// API
app.use('/api/data', data);
app.use('/api/last-record', lastRecord);
app.use('/api/hour-data', hourData);
app.use('/api/3hour-data', $3hourData);
app.use('/api/12hour-data', $12hourData);
app.use('/api/day-data', dayData);
app.use('/api/week-data', weekData);
app.use('/api/month-data', monthData);

if(process.env.NODE_ENV ==='production'){
    app.use((req, res, next) => {
      if (req.header('x-forwarded-proto') !== 'https') {
        res.redirect(`https://${req.header('host')}${req.url}`)
      } else {
        next();
      }
    });
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}
app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
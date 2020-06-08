const express = require('express');
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;
const data = require('./routes/api/data');
const dailyData = require('./routes/api/daily-data');

const app = express();
const port = 3334;

app.use(express.json());

mongoose
    .connect(db, {
         useNewUrlParser: true,
         useUnifiedTopology: true
        })
    .then(() => console.log("MongoDB connected!"))
    .catch(err => console.log(err));

app.use('/api/data', data);
app.use('/api/daily-data', data);

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
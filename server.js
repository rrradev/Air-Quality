const express = require('express');
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;

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

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/', (req, res) => {
    console.log('Someone posted');
    console.log(req.body.pm25);
    console.log(req.body.pm10);  
});

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
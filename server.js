const express = require('express');
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;
const data = require('./routes/api/data');

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

app.post('/', (req, res) => {
    console.log('Someone posted:');
    console.log(req.body.pm25);
    console.log(req.body.pm10);  
});

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
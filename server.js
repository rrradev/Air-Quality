const express = require('express');
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;
const data = require('./routes/api/data');
const hourData = require('./routes/api/hour-data');
const $3hourData = require('./routes/api/3hour-data');
const $12hourData = require('./routes/api/12hour-data');
const dayData = require('./routes/api/day-data');
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

app.use('/api/data', data);
app.use('/api/hour-data', hourData);
app.use('/api/3hour-data', $3hourData);
app.use('/api/12hour-data', $12hourData);
app.use('/api/day-data', dayData);

if(process.env.NODE_ENV ==='production'){
    app.use(express.static('client/build'));
    app.get('*', (req, res) =>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}
app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
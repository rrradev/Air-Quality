const express = require('express');
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;
const data = require('./routes/api/data');
const path = require('path');
const fs = require('fs');

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

if (process.env.NODE_ENV === 'production') {
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

const banner = fs.readFileSync(__dirname + "/banner.txt");

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
  console.log(banner.toString());
});
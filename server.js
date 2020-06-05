const express = require('express');
const app = express();
const port = 3334;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
}
);

app.post('/', (req, res) => {
    console.log('Someone posted');
    console.log(req.body.pm25);
    console.log(req.body.pm10);  
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
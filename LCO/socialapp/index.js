// console.log('Hello World from Atharva');

const express = require('express');
const app = express();

const PORT = 4000 || process.env.PORT;

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
  });

app.listen(PORT, () => {
    console.log(`Application is running on the port ${PORT}`);
});
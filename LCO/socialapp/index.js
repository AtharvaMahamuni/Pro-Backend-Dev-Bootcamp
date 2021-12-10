const express = require('express');
const app = express();

const PORT = 4000 || process.env.PORT;

app.get('/', (req, res) => {
  res.status(200).send("<h2>Hello there, I am Atharva!!!</h2>");
});

app.get('/api/v1/instagram', (req, res) => {
  const instaSocial= {
    "username" : "atharvaMahamuni",
    "followers" : "1,000,000",
    "follows" : "8",
    "date" : Date.now()
  };

  res.status(200).json(instaSocial);

});

app.get('/api/v1/facebook', (req, res) => {
  const faceSocial= {
    "username" : "atharvaMahamuni",
    "followers" : "1,000",
    "follows" : "1,000",
    "date" : Date.now()
  };

  res.status(200).json(faceSocial);

});

app.get('/api/v1/linkedin', (req, res) => {
  const linkSocial= {
    "username" : "atharvaMahamuni",
    "followers" : "500",
    "follows" : "80",
    "date" : Date.now()
  };

  res.status(200).json(linkSocial);

});

app.listen(PORT, ()=>{
  console.log(`Listening on port ${PORT}`)
});
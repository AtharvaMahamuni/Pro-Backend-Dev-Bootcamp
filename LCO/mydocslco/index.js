const express = require("express");

const app = express();

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = 4000;


app.get("/", (req, res) => {
    res.send("Hey there, I am Atharva...")
});

app.listen(PORT, ()=>{
    console.log(`Listening on port no ${PORT}...`)
});
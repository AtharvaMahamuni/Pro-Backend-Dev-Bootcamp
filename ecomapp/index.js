const app = require('./app');
require('dotenv').config();



app.listen(process.env.PORT, () => {
    console.log(`Server is listening on PORT: ${process.env.PORT}`)
});
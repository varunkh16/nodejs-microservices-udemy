const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const queryRoutes = require("./routes");

const app = express();
const port = 4002;

app.use(bodyParser.json());
app.use(cors());
app.use('/', queryRoutes);

app.listen(port, () => {
    console.log(`Query service running on ${port}`);
});
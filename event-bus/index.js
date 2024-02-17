const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const eventBusRoutes = require("./routes");

const app = express();
const port = 4005;

app.use(bodyParser.json());
app.use(cors());
app.use('/', eventBusRoutes);

app.listen(port, () => {
    console.log(`Event-Bus service running on ${port}`);
});
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require("axios");
const queryRoutes = require("./routes").router;
const handleEvent = require("./routes").handleEvent;

const app = express();
const port = 4002;

app.use(bodyParser.json());
app.use(cors());
app.use('/', queryRoutes);

app.listen(port, async () => {
    console.log(`Query service running on ${port}`);
    try {
        let res = await axios.get('http://localhost:4005/events')

        for (let event of res.data) {
            console.info("Processing event : ", event.type);
            handleEvent(event.type, event.data);
        }
    } catch (err) {
        console.error(err.message);
    }
});
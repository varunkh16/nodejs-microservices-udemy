const express = require('express');
const bodyParser = require('body-parser');
const moderationRoutes = require("./routes");

const port = 4003;
const app = express();

app.use(bodyParser.json());
app.use('/', moderationRoutes);

app.listen(port, () => {
    console.log(`Moderation service running on ${port}`);
});
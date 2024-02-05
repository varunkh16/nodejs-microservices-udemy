const Express = require("express");
const app = Express();
const bodyParser = require("body-parser");
const cors = require('cors');
const port = 4001;
const commentsRoutes = require("./routes");

app.use(bodyParser.json());
app.use(cors());
app.use('/', commentsRoutes);

app.listen(port, () => {
    console.log(`Comments service running on ${port}`);
});
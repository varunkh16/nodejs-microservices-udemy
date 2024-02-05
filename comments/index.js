const Express = require("express");
const app = Express();
const bodyParser = require("body-parser");
const port = 4001;
const commentsRoutes = require("./routes");

app.use(bodyParser.json());
app.use('/', commentsRoutes);

app.listen(port, () => {
    console.log(`Comments service running on ${port}`);
});
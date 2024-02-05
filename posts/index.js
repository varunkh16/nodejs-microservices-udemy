const Express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const app = Express();

const postsRouter = require("./routes");

const port = 4000;

app.use(bodyParser.json());
app.use(cors());
app.use('/', postsRouter);

app.listen(port, () => {
    console.log(`Posts service running on ${port}`);
});
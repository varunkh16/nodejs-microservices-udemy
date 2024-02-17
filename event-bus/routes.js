const Express = require("express");
const router = Express.Router();
const axios = require("axios");

router.post('/events', (request, response) => {
    const event = request.body;

    axios.post("http://localhost:4000/events", event);
    axios.post("http://localhost:4001/events", event);
    axios.post("http://localhost:4002/events", event);

    response.send({status : "OK"});
});

module.exports = router;
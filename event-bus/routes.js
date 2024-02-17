const Express = require("express");
const router = Express.Router();
const axios = require("axios");

const events = [];

router.post('/events', (request, response) => {
    const event = request.body;
    events.push(event);

    axios.post("http://localhost:4000/events", event).catch((err) => {
        console.log(err.message);
    });
    axios.post("http://localhost:4001/events", event).catch((err) => {
        console.log(err.message);
    });
    axios.post("http://localhost:4002/events", event).catch((err) => {
        console.log(err.message);
    });
    axios.post("http://localhost:4003/events", event).catch((err) => {
        console.log(err.message);
    });

    response.send({status : "OK"});
});

router.get('/events', (request, response) => {
    response.send(events);
});
module.exports = router;
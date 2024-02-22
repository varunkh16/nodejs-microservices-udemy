const Express = require("express");
const { randomBytes } = require('crypto');
const axios = require("axios");

const router = Express.Router();

const posts = {};

router.get('/posts', (req, res) => {
    try {
        console.info("inside get posts route");

        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
    }
});

router.post('/posts', async (req, res) => {
    try {
        console.info("inside create posts route");
        const { title } = req.body;

        const id = randomBytes(4).toString('hex');
        posts[id] = {
            id,
            title
        };

        await axios.post("http://event-bus-srv:4005/events", {
            type: "PostCreated",
            data: {
                id,
                title
            }
        }).catch((err) => {
            console.log(err.message);
        });

        res.status(201).json(posts[id]);
    } catch (error) {
        console.error(error);
    }
});

router.post('/events', (req, res) => {
    console.info("Received Event : "+req.body.type);

    res.send({});
});
module.exports = router;
const Express = require('express');
const router = Express.Router();
const axios = require("axios");

router.post('/events', async (req, res) => {
    const { type, data } = req.body;

    if (type == 'CommentCreated') {
        const status = data.content.includes("orange") ? "rejected" : "approved";

        await axios.post("http://event-bus-srv:4005/events", {
            type: "CommentModerated",
            data: {
                id: data.id,
                postId: data.postId,
                status,
                content: data.content
            }
        }).catch((err) => {
            console.error(err.message);
        });
    }

    res.send({});
});

module.exports = router;
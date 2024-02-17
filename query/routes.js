const Express = require('express');
const router = Express.Router();
const axios = require("axios");

const posts = {};

router.get('/posts', (req, res) => {
    res.send(posts);
});

router.post('/events', (req, res) => {
    console.info("Received Event : " + req.body.type);

    const { type, data } = req.body;

    if (type == 'PostCreated') {
        const { id, title } = data;
        posts[id] = { id, title, comments: [] };
    }

    if (type == 'CommentCreated') {
        const { id, content, postId } = data;
        posts[postId]['comments'].push({
            id,
            content
        });
    }

    res.send({});
});
module.exports = router;
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
        const { id, content, postId, status } = data;
        posts[postId]['comments'].push({
            id,
            content,
            status
        });
    }

    if (type == 'CommentUpdated') {
        const { id, content, postId, status } = data;
        const post = posts[postId];
        const comment = post.comments.find(comment => {
            return comment.id == id;
        });
        comment.content = content;
        comment.status = status;
    }

    res.send({});
});
module.exports = router;
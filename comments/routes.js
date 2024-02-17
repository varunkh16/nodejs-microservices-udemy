const Express = require("express");
const router = Express.Router();
const { randomBytes } = require("crypto"); 
const axios = require("axios");

const commentsByPostId = {};

router.get('/posts/:id/comments', (req, res) => {
    try {
        console.info("inside router to get comments for the associated post id");

        res.status(200).send(commentsByPostId[req.params.id] || []);
    } catch(error) {
        console.error(error);
    }
});

router.post('/posts/:id/comments', async (req, res) => {
    try {
        console.info("inside router to create comments for the associated post id");

        const commentId = randomBytes(4).toString('hex');
        const comments = commentsByPostId[req.params.id] || [];
        const { content } = req.body;

        comments.push({
            id: commentId,
            content
        });

        commentsByPostId[req.params.id] = comments;

        await axios.post("http://localhost:4005/events", {
            type: "CommentCreated",
            data: {
                id: commentId,
                content,
                postId: req.params.id
            }
        });

        res.status(201).send(comments);
    } catch(error) {
        console.error(error);
    }
});

router.post('/events', (req, res) => {
    console.info("Received Event : "+req.body.type);

    res.send({});
});
module.exports = router;
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
            content,
            status: 'pending'
        });

        commentsByPostId[req.params.id] = comments;

        await axios.post("http://event-bus-srv:4005/events", {
            type: "CommentCreated",
            data: {
                id: commentId,
                content,
                postId: req.params.id,
                status: 'pending'
            }
        }).catch((err) => {
            console.log(err.message);
        });

        res.status(201).send(comments);
    } catch(error) {
        console.error(error);
    }
});

router.post('/events', async (req, res) => {
    console.info("Received Event : " + req.body.type);
    const { type, data } = req.body;

    if (type == 'CommentModerated') {
        const { id, postId, status, content} = data;
        const comments = commentsByPostId[postId];
        const comment = comments.find(comment => {
            return comment.id == id;
        });
        comment.status = status;
        await axios.post("http://event-bus-srv:4005/events", {
            type: "CommentUpdated",
            data: {
                id,
                content,
                postId,
                status
            }
        }).catch((err) => {
            console.log(err.message);
        });
    }

    res.send({});
});
module.exports = router;
const Express = require("express");
const router = Express.Router();
const { randomBytes } = require("crypto"); 

const commentsByPostId = {};

router.get('/posts/:id/comments', (req, res) => {
    try {
        console.info("inside router to get comments for the associated post id");

        res.status(200).send(commentsByPostId[req.params.id] || []);
    } catch(error) {
        console.error(error);
    }
});

router.post('/posts/:id/comments', (req, res) => {
    try {
        console.info("inside router to create comments for the associated post id");

        const commentId = randomBytes(4).toString('hex');
        const comments = commentsByPostId[req.params.id] || [];

        comments.push({
            id: commentId,
            ...req.body
        });

        commentsByPostId[req.params.id] = comments;

        res.status(201).send(comments);
    } catch(error) {
        console.error(error);
    }
});

module.exports = router;
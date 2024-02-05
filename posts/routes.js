const Express = require("express");
const { randomBytes } = require('crypto');

const router = Express.Router();

const posts = {};

router.get('/posts', (req, res) => {
    try {
        console.log("inside get posts route");

        res.status(200).json(posts);
    } catch (error) {
        console.log(error);
    }
});

router.post('/posts', (req, res) => {
    try {
        console.log("inside create posts route");

        const id = randomBytes(4).toString('hex');
        posts[id] = {
            id,
            ...req.body
        };

        res.status(201).json(posts[id]);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
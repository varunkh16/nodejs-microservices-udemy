const Express = require("express");
const { randomBytes } = require('crypto');

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

router.post('/posts', (req, res) => {
    try {
        console.info("inside create posts route");

        const id = randomBytes(4).toString('hex');
        posts[id] = {
            id,
            ...req.body
        };

        res.status(201).json(posts[id]);
    } catch (error) {
        console.error(error);
    }
});

module.exports = router;
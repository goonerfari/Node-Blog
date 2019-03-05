const express = require('express');
const postDb = require('./../data/helpers/postDb.js');
const userDb = require('./../data/helpers/userDb.js');
const router = express.Router();


router.get('/', async (req, res) => {

    const posts = await postDb.get(req.query);

    try {
        if (posts) {
            res.status(200).json(posts);
        }
        else {
            res.status(404).json('There are no available posts')
        }
    }
    catch (e) {
        res.status(500).json(e)
    }
})

router.post('/', async (req, res) => {
    const Post = req.body;
    Post.user_id = 1;
    const added = await postDb.insert(Post);

    try {
        if (added) {
            res.status(201).json('Item Added');
        }
        else {
            res.json('Please enter title and body');
        }
    }
    catch (e) {
        res.status(500).json(e);
    }
});

router.get('/:postId', async (req, res) => {

})


module.exports = router;
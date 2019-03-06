const express = require('express');
const postDb = require('../data/helpers/postDb.js');
const userDb = require('../data/helpers/userDb.js');
const router = express.Router();


router.get('/', async (req, res) => {

    const users = await userDb.get();

    try {
        if (users) {
            res.status(200).json(users);
        }
        else {
            res.status(404).json(`Users are not available.`)
        }
    }
    catch (e) {
        res.status(500).json(e)
    }
})

// router.get('/:userId', async (req, res) => {

//     const posts = await userDb.getUserPosts(req.params);

//     try {
//         if (posts) {
//             res.status(200).json(posts);
//         }
//         else {
//             res.status(404).json(`User's posts are not available.`)
//         }
//     }
//     catch (e) {
//         res.status(500).json(e)
//     }

// })

module.exports = router;

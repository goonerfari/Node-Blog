const express = require('express');
const postDb = require('../data/helpers/postDb.js');
const userDb = require('../data/helpers/userDb.js');
const router = express.Router();

router.use(express.json());

function upperCase(req, res, next) {

    const name = req.body.name;
    // console.log(req.body);
    const modified = name;
    modified[0] = modified[0].toUpperCase();

    if (name === modified) {
        next();
    }
    else {
        res.json({ 
            message: 'User is not capitalized.',
            err: 'User is not capitalized.'
        })    
    }
}
router.use((err, req, res, next) => {
  
    res
      .status(500)
      .json({ 
          message: 'There was an error performing the required operation',
          err: err
        });
});

router.get('/', async (req, res) => {

    try {
        const users = await userDb.get();

        if (users) {
            res.status(200).json(users);
        }
        else {
            console.log('here')
            res.status(404).json(`Users are not available.`)
        }
    }
    catch (e) {
        console.log(e)
        res.status(500).json(e);
    }
})

router.post('/', upperCase, async (req, res) => {

    const newUser = req.body.name;

    try {
        const added = await userDb.insert(newUser);

        if (added) {
            res.status(201).json('New User added.')
        }
        else {
            res.status(404).json('Post id is unavailable.')
        }
    }
    catch (e) {
        res.status(500).json(e);
    }

})

router.get('/:userId', async (req, res) => {

    try {
        // const user = await userDb.getById(req.params.userId);
        const posts = await userDb.getUserPosts(req.params.userId);


        if (posts) {
            res.status(200).json(posts);
        }

        else {
            res.status(404).json(`User's posts are not available.`)
        }
    }

    catch (e) {
        res.status(500).json(e)
    }
    

})

module.exports = router;

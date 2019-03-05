const express = require('express');

const postDb = require('./../data/helpers/postDb');
const userDb = require('./../data/helpers/userDb');

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).send('Route page is up and running')
});

module.exports = router;
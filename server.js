const express = require('express');
const server = express();
const logger = require('morgan');
const helmet = require('helmet');
server.use(express.json(), logger('dev'), helmet());

const postRoutes = require('./posts/postRoutes');
const userRoutes = require('./users/userRoutes');






server.get('/', (req, res) => {
    res.status(200).json('Home Page up and running')
});

server.use('/api/posts/', postRoutes);
server.use('/api/users/', userRoutes);


module.exports = server;
const express = require('express');
const cors = require('cors');
const server = express();
const logger = require('morgan');
const path = require('path');
const helmet = require('helmet');
server.use(express.json(), logger('dev'), cors(),helmet());

const postRoutes = require('./posts/postRoutes');
const userRoutes = require('./users/userRoutes');

server.use(express.static(__dirname, './uploads'));

server.get('/', (req, res) => {
    res.status(200).json('Home Page up and running')
});

server.use('/api/posts/', postRoutes);
server.use('/api/users/', userRoutes);


module.exports = server;
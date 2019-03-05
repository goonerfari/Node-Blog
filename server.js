const express = require('express');
const server = express();
const postRoutes = require('./posts/postRoutes');
server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).send('Home Page up and running')
});
server.use('/posts', postRoutes);
module.exports = server;
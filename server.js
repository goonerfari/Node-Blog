const express = require('express');
const server = express();
server.use(express.json());
const postRoutes = require('./posts/postRoutes');

server.get('/', (req, res) => {
    res.status(200).send('Home Page up and running')
});
server.use('/api/posts/', postRoutes);
module.exports = server;
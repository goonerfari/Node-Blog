const express = require('express');
const server = express();
const logger = require('morgan');
const helmet = require('helmet');
server.use(express.json(), logger('dev'), helmet(), upperCase);

const postRoutes = require('./posts/postRoutes');
const userRoutes = require('./users/userRoutes');

function upperCase(req, res, next) {
    // const password = req.headers.authorization;

    const username = req.body.name
    const modified = username;
    modified[0] = modified[0].toUpperCase();

    if (username === modified) {
        next();
    }
    else {
        next({
            err: 'User is not capitalized'
        })
    }
}
server.use((err, req, res, next) => {
  
    res
      .status(500)
      .json({ 
          message: 'There was an error performing the required operation',
          err: err
        });
  });


server.get('/', (req, res) => {
    res.status(200).json('Home Page up and running')
});

server.use('/api/posts/', upperCase, postRoutes);
server.use('/api/users/', upperCase, userRoutes);

module.exports = server;
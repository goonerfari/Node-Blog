const express = require('express');
const server = express();
const logger = require('morgan');
const helmet = require('helmet');
server.use(express.json(), logger('dev'), helmet(), restricted);

const postRoutes = require('./posts/postRoutes');
const userRoutes = require('./users/userRoutes');

function restricted(req, res, next) {
    const password = req.headers.authorization;

    if (password === 'mellon') {
        next();
    }
    else if (password) {
        res.status(401).json({err: 'Credentials are not valid'})
    }
    else {
        next({
            err: 'no credentials provided'
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

server.use('/api/posts/', restricted, postRoutes);
server.use('/api/users/', restricted, userRoutes);

module.exports = server;
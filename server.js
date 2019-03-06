const express = require('express');
const server = express();
const logger = require('morgan');
const helmet = require('helmet');
server.use(express.json(), logger('dev'), helmet(), restricted);

const postRoutes = require('./posts/postRoutes');

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
    console.error(err);
  
    res
      .status(500)
      .json({ message: 'There was an error performing the required operation' });
  });

  
// server.use((err, req, res, next) => {
//     res.status(400).json({
//         message: 'erro on error side',
//         err: err
//     })
// })
// server.use()

server.get('/', (req, res) => {
    res.status(200).json('Home Page up and running')
});
server.use('/api/posts/', restricted, postRoutes);
module.exports = server;
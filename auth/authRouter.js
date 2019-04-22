const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const users = require('./../data/helpers/userDb');
const secret = require('./../config/secrets').jwtSecret;

router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
    user.password = hash;
    users.insert(user)
      .then(saved => {
        res.status(201).json(saved);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });
  
  router.post('/login', (req, res) => {
    let { username, password } = req.body;
    console.log(username);
    console.log(password);
    // console.log(bcrypt.compareSync(password, user.password))
    console.log(users)
    users.findBy({ username })
      .first()
      .then(user => {
         console.log(user)
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = generateToken(user);
          console.log(user)
          res.status(200).json({
            token, message: `Welcome ${user.username}!`, user: user
          });
        } else {
          res.status(401).json({ message: 'Invalid Credentials' });
        }
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });
  
  function generateToken(user) {
    const payload = {
      subject: user.id,
      username: user.username
    }
    const options = {
      expiresIn: '1d',
    }
    return jwt.sign(payload, secret, options)
  }
  
  module.exports = router;
const router = require('express').Router();
const byCrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// @route POST api/users/register
// @desc Register user
// @access Public

router.post('/register', (req, res) => {
  const { isValid, errors } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(200).json({ error: 'Email already exists' });
    }
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    byCrypt.genSalt(10, (err, salt) => {
      byCrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser
          .save()
          .then((user) => res.json(user))
          .catch((err) => console.log(err));
      });
    });
  });
});

// @route POST api/users/login
// @desc login user
// @access Public

router.post('/login', (req, res) => {
  const { isValid, errors } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then((user) => {
    if (!user) {
      return res.status(404).json({ err: 'User not found' });
    }
    byCrypt.compare(req.body.password, user.password).then((isMatch) => {
      if (isMatch) {
        const payload = {
          id: user.id,
          name: user.name,
          email: user.email,
        };

        jwt.sign(
          payload,
          process.env.SECRET_KEY,
          {
            expiresIn: 31556926,
          },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token,
              user: payload,
            });
          }
        );
      } else {
        res.status(400).json({ err: 'Password incorrect' });
      }
    });
  });
});

module.exports = router;

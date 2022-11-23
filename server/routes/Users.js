const express = require('express');
const router = express.Router();
const { Users } = require('../models');
const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken');
const { validateToken } = require('../middlewares/AuthMiddleware');
require('dotenv').config();

router.get('/', validateToken, (req, res) => {
  res.json(req.user);
});

// Register
router.post('/', async (req, res) => {
  const { username, password } = req.body;

  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username: username,
      password: hash,
      role: 'user',
    });
  });

  res.json('User Created!!!');
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await Users.findOne({
    where: {
      username: username,
    },
  });

  if (!user) {
    res.json({ error: "User doesn't exist" });
  } else {
    bcrypt.compare(password, user.password).then((matched) => {
      if (!matched) {
        res.json({ error: 'Wrong Password' });
      } else {
        const accessToken = sign(
          { id: user.id, username: user.username },
          process.env.JWT_ACCESS_TOKEN
        );

        res.json({
          accessToken: accessToken,
          id: user.id,
          username: user.username,
          role: user.role,
        });
      }
    });
  }
});

// router.get('/user/:id', async (req, res) => {
//   const id = req.params.id;

//   const userProfile = await Users.findByPk(id, {
//     attributes: { exclude: ['password'] },
//   });

//   res.json(userProfile);
// });

module.exports = router;

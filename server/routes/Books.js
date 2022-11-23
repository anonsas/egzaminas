const express = require('express');
const router = express.Router();
const { Books } = require('../models');
const { validateToken } = require('../middlewares/AuthMiddleware');

router.get('/', validateToken, async (req, res) => {
  const bookList = await Books.findAll();
  res.json(bookList);
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const bookById = await Books.findByPk(id);
  res.json(bookById);
});

router.post('/', validateToken, async (req, res) => {
  const newBook = req.body;
  newBook.username = req.user.username;
  newBook.UserId = req.user.id;
  await Books.create(newBook);
  res.json(newBook);
});

router.delete('/:id', validateToken, async (req, res) => {
  const bookId = req.params.id;
  await Books.destroy({
    where: {
      id: bookId,
    },
  });
  res.json('Post Deleted Successfully');
});

// Get All Books, written by the specific User.
router.get('/user/:id', async (req, res) => {
  const id = req.params.id;
  const postsByUserId = await Books.findAll({
    where: { UserId: id },
  });
  res.json(postsByUserId);
});

module.exports = router;

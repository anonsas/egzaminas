const express = require('express');
const router = express.Router();
const { Posts, Likes } = require('../models');
const { validateToken } = require('../middlewares/AuthMiddleware');

router.get('/', validateToken, async (req, res) => {
  const allPosts = await Posts.findAll({ include: [Likes] });
  const likedPosts = await Likes.findAll({ where: { UserId: req.user.id } });
  res.json({ postList: allPosts, likedPostList: likedPosts });
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const postById = await Posts.findByPk(id);
  res.json(postById);
});

// Get All Posts, written by the specific User.
router.get('/user/:id', async (req, res) => {
  const id = req.params.id;
  const postsByUserId = await Posts.findAll({
    where: { UserId: id },
    include: [Likes],
  });
  res.json(postsByUserId);
});

router.post('/', validateToken, async (req, res) => {
  const newPost = req.body;
  newPost.username = req.user.username;
  newPost.UserId = req.user.id;
  await Posts.create(newPost);
  res.json(newPost);
});

router.delete('/:id', validateToken, async (req, res) => {
  const postId = req.params.id;
  await Posts.destroy({
    where: {
      id: postId,
    },
  });
  res.json('Post Deleted Successfully');
});

module.exports = router;

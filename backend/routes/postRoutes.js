const express = require('express');
const { getPosts, createPost, getCommentsForPost, addCommentToPost } = require('../controllers/postController');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/posts', getPosts);
router.post('/posts', auth, createPost);
router.get('/posts/:id/comments', getCommentsForPost);
router.post('/posts/:id/comments', auth, addCommentToPost);

module.exports = router;

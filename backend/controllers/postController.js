const Post = require('../models/Gossip');
const Comment = require('../models/Comment');

// Buscar todos os posts
exports.getPosts = async (req, res) => {
  const posts = await Post.find().populate('author', 'name');
  res.json(posts);
};

// Criar novo post
exports.createPost = async (req, res) => {
  const { title, content } = req.body;
  const newPost = new Post({ title, content, author: req.user.id });
  await newPost.save();
  res.status(201).json(newPost);
};

// Buscar comentários de um post
exports.getCommentsForPost = async (req, res) => {
  const comments = await Comment.find({ post: req.params.id });
  res.json(comments);
};

// Adicionar comentário a um post
exports.addCommentToPost = async (req, res) => {
  const { content } = req.body;
  const newComment = new Comment({
    content,
    post: req.params.id,
    author: req.user.id,
  });
  await newComment.save();
  res.status(201).json(newComment);
};

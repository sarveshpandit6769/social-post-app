const Post = require("../models/Post");

exports.createPost = async (req, res) => {
  try {
    const { text } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : "";

    if (!text && !image) {
      return res.status(400).json({
        message: "Please add text or image"
      });
    }

    const post = await Post.create({
      userId: req.user._id,
      username: req.user.username,
      text,
      image
    });

    res.status(201).json({
      message: "Post created successfully",
      post
    });
  } catch (error) {
    res.status(500).json({ message: "Post creation failed", error: error.message });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch posts", error: error.message });
  }
};

exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const alreadyLiked = post.likes.find(
      (like) => like.userId === req.user._id.toString()
    );

    if (alreadyLiked) {
      post.likes = post.likes.filter(
        (like) => like.userId !== req.user._id.toString()
      );
    } else {
      post.likes.push({
        username: req.user.username,
        userId: req.user._id.toString()
      });
    }

    await post.save();

    res.status(200).json({
      message: "Like updated",
      post
    });
  } catch (error) {
    res.status(500).json({ message: "Like failed", error: error.message });
  }
};

exports.commentPost = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Comment text is required" });
    }

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.comments.push({
      username: req.user.username,
      text
    });

    await post.save();

    res.status(201).json({
      message: "Comment added",
      post
    });
  } catch (error) {
    res.status(500).json({ message: "Comment failed", error: error.message });
  }
};
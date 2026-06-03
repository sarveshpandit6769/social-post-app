const express = require("express");
const {
  createPost,
  getPosts,
  likePost,
  commentPost
} = require("../controllers/postController");

const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.get("/", getPosts);
router.post("/", protect, upload.single("image"), createPost);
router.put("/:id/like", protect, likePost);
router.post("/:id/comment", protect, commentPost);

module.exports = router;
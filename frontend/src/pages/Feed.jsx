import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api";
const BACKEND_URL = "http://localhost:5000";

function Feed() {
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [commentText, setCommentText] = useState({});

  const token = localStorage.getItem("token");
  const isGuest = localStorage.getItem("guest") === "true";

  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${API_URL}/posts`);
      setPosts(res.data);
    } catch (error) {
      alert("Failed to load posts");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleCreatePost = async (e) => {
    e.preventDefault();

    if (isGuest) {
      alert("Please login or signup to create a post");
      return;
    }

    if (!text && !image) {
      alert("Please write text or select image");
      return;
    }

    const formData = new FormData();
    formData.append("text", text);

    if (image) {
      formData.append("image", image);
    }

    try {
      await axios.post(`${API_URL}/posts`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });

      setText("");
      setImage(null);
      fetchPosts();
    } catch (error) {
      alert(error.response?.data?.message || "Post failed");
    }
  };

  const handleLike = async (postId) => {
    if (isGuest) {
      alert("Please login or signup to like posts");
      return;
    }

    try {
      const res = await axios.put(
        `${API_URL}/posts/${postId}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setPosts(posts.map((post) => (post._id === postId ? res.data.post : post)));
    } catch (error) {
      alert("Like failed");
    }
  };

  const handleComment = async (postId) => {
    if (isGuest) {
      alert("Please login or signup to comment");
      return;
    }

    const comment = commentText[postId];

    if (!comment) {
      alert("Please write a comment");
      return;
    }

    try {
      const res = await axios.post(
        `${API_URL}/posts/${postId}/comment`,
        { text: comment },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setPosts(posts.map((post) => (post._id === postId ? res.data.post : post)));

      setCommentText({
        ...commentText,
        [postId]: ""
      });
    } catch (error) {
      alert("Comment failed");
    }
  };

  return (
    <div className="feed-container">
      {isGuest ? (
        <div className="create-post-card">
          <h2>Guest Mode</h2>

          <p className="guest-message">
            You are viewing posts as a guest. Please login or signup to create
            posts, like, or comment.
          </p>
        </div>
      ) : (
        <div className="create-post-card">
          <h2>Create Post</h2>

          <form onSubmit={handleCreatePost}>
            <textarea
              placeholder="What's on your mind?"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />

            <button type="submit">Post</button>
          </form>
        </div>
      )}

      {posts.length === 0 ? (
        <div className="post-card">
          <p>No posts yet. Be the first one to post!</p>
        </div>
      ) : (
        posts.map((post) => (
          <div className="post-card" key={post._id}>
            <div className="post-header">
              <div className="avatar">
                {post.username?.charAt(0).toUpperCase()}
              </div>

              <div>
                <h3>{post.username}</h3>
                <small>{new Date(post.createdAt).toLocaleString()}</small>
              </div>
            </div>

            {post.text && <p className="post-text">{post.text}</p>}

            {post.image && (
              <img
                src={`${BACKEND_URL}${post.image}`}
                alt="post"
                className="post-image"
              />
            )}

            <div className="post-actions">
              <button onClick={() => handleLike(post._id)} disabled={isGuest}>
                ❤️ Like ({post.likes.length})
              </button>

              <span>💬 Comments ({post.comments.length})</span>
            </div>

            <div className="liked-users">
              {post.likes.length > 0 && (
                <small>
                  Liked by: {post.likes.map((like) => like.username).join(", ")}
                </small>
              )}
            </div>

            <div className="comments-box">
              {post.comments.length > 0 ? (
                post.comments.map((comment, index) => (
                  <p key={index}>
                    <b>{comment.username}:</b> {comment.text}
                  </p>
                ))
              ) : (
                <small>No comments yet</small>
              )}
            </div>

            {!isGuest && (
              <div className="comment-input">
                <input
                  type="text"
                  placeholder="Write a comment..."
                  value={commentText[post._id] || ""}
                  onChange={(e) =>
                    setCommentText({
                      ...commentText,
                      [post._id]: e.target.value
                    })
                  }
                />

                <button onClick={() => handleComment(post._id)}>Comment</button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default Feed;
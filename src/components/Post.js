import React from "react";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
  return (
    <div>
      <Link to={`/post/${post.id}`}>
        <h3>{post.title}</h3>
      </Link>
      <p>{post.quantity}</p>
      <p>{post.calories}</p>
    </div>
  );
};

export default Post;

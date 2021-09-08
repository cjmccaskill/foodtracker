import React from "react";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
  return (
    <div>
      <Link to={`/post/${post.id}`}>
        <h3>{post.title}</h3>
        <img src={post.image} alt={post.title} />
      </Link>
      <p>Servings: {post.servings}</p>
      <p>Calories: {post.calories}</p>
    </div>
  );
};

export default Post;

import React from "react";
import { Link } from "react-router-dom";

const SinglePost = ({ posts, match, editPost, deletePost }) => {
  const id = parseInt(match.params.id);
  const post = posts.find((post) => post.id === id);

  return (
    <div>
      <h3>{post.title}</h3>
      <img src={post.image} alt={post.title} />
      <p>Servings: {post.servings}</p>
      <p>Calories: {post.calories}</p>
      <button onClick={() => editPost(post)}>Edit</button>
      <button onClick={() => deletePost(post)}>Delete</button>
      <Link to="/allposts">
        <button>Go Back</button>
      </Link>
    </div>
  );
};

export default SinglePost;

import "./App.css";
import AllPosts from "./pages/AllPosts";
import SinglePost from "./pages/SinglePost";
import Form from "./pages/Form";
import { Route, Switch, Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

function App(props) {
  // API url
  const url = "https://cm-foodtracker-api.herokuapp.com/tracker/";
  // Initial State
  const [posts, setPosts] = useState([]);
  // New post variable
  const nullPost = {
    image: "",
    title: "",
    servings: "",
    calories: "",
  };
  // State to handle changes
  const [targetPost, setTargetPost] = useState(nullPost);

  // Functions for populating the data from API
  const getPosts = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setPosts(data);
  };

  const addFood = async (trackFood) => {
    await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(trackFood),
    });
    getPosts();
  };

  const getTargetPost = (post) => {
    setTargetPost(post);
    props.history.push("/edit");
  };

  const updatePost = async (post) => {
    await fetch(url + post.id + "/", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(),
    });
    getPosts();
  };

  const deletePost = async (post) => {
    await fetch(url + post.id + "/", {
      method: "delete",
    });
    getPosts();
    props.history.push("/");
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="App">
      <h1>Food Tracker</h1>
      <Link to="/new">
        <button>Track Food</button>
      </Link>
      <Switch>
        <Route
          exact
          path="/"
          render={(routerprops) => <AllPosts {...routerprops} posts={posts} />}
        />
        <Route
          path="/post/:id"
          render={(routerprops) => (
            <SinglePost
              {...routerprops}
              posts={posts}
              editPost={getTargetPost}
              deletePost={deletePost}
            />
          )}
        />
        <Route
          path="/new"
          render={(routerprops) => (
            <Form
              {...routerprops}
              initialPost={nullPost}
              handleSubmit={addFood}
              buttonLabel="Track Food"
            />
          )}
        />
        <Route
          path="/edit"
          render={(routerprops) => (
            <Form
              {...routerprops}
              initialPost={targetPost}
              handleSubmit={updatePost}
              buttonLabel="Update Tracker"
            />
          )}
        />
      </Switch>
    </div>
  );
}

export default App;

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
    quantity: "",
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
            <SinglePost {...routerprops} posts={posts} />
          )}
        />
        <Route
          path="/new"
          render={(routerprops) => <Form {...routerprops} />}
        />
        <Route
          path="/edit"
          render={(routerprops) => <Form {...routerprops} />}
        />
      </Switch>
    </div>
  );
}

export default App;

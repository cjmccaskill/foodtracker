import "./App.css";
import AllPosts from "./pages/AllPosts";
import SinglePost from "./pages/SinglePost";
import Form from "./pages/Form";
import Login from "./pages/Login";
import TrackButton from "./components/TrackButton";
import { Route, Switch } from "react-router-dom";
import React, { useState, useEffect } from "react";

function App(props) {
  // API url
  const url = "https://cm-foodtracker-api.herokuapp.com/";

  // Auth state
  const [token, setToken] = useState("");

  const getToken = async (un, pw) => {
    const response = await fetch(url + "api/token/", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: un, password: pw }),
    });
    const data = await response.json();
    setToken(data);
  };

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
    const response = await fetch(url + "tracker/", {
      method: "get",
      headers: {
        Authorization: `Bearer ${token.access}`,
      },
    });
    const data = await response.json();
    setPosts(data);
  };

  const addFood = async (trackFood) => {
    await fetch(url + "tracker/", {
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
    await fetch(url + 'tracker/"' + post.id + "/", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(),
    });
    getPosts();
  };

  const deletePost = async (post) => {
    await fetch(url + "tracker/" + post.id + "/", {
      method: "delete",
    });
    getPosts();
    props.history.push("/allposts");
  };

  useEffect(() => {
    if (token) {
      getPosts();
      props.history.push("/allposts");
    }
  }, [token]);

  return (
    <div className="App">
      <h1>Food Tracker</h1>
      <Switch>
        <Route
          exact
          path="/"
          render={(routerprops) => (
            <Login {...routerprops} getToken={getToken} />
          )}
        />
        <Route
          path="/allposts"
          render={(routerprops) => (
            <>
              <TrackButton />
              <AllPosts {...routerprops} posts={posts} token={token} />
            </>
          )}
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

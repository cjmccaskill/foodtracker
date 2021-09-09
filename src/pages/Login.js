import React, { useRef } from "react";

const Login = (props) => {
  const username = useRef(null);
  const password = useRef(null);

  const handleLogin = () => {
    const un = username.current.value;
    const pw = password.current.value;
    props.getToken(un, pw);
    username.current.value = "";
    password.current.value = "";
  };
  return (
    <div>
      <input
        type="text"
        name="username"
        ref={username}
        placeholder="Username"
      />
      <input
        type="password"
        name="password"
        ref={password}
        placeholder="Password"
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;

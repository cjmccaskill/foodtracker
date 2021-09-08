import React, { useState } from "react";

const Form = ({ initialPost, handleSubmit, buttonLabel, history }) => {
  const [formData, setFormData] = useState(initialPost);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.taret.value });
  };

  const handleSubmission = (event) => {
    event.preventDefault();
    handleSubmit(formData);
    history.push("/");
  };
  return (
    <form onSubmit={handleSubmission}>
      <input
        type="text"
        onChange={handleChange}
        value={formData.title}
        name="title"
      />
    </form>
  );
};

export default Form;

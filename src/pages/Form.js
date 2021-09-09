import React, { useState } from "react";

const Form = ({ initialPost, handleSubmit, buttonLabel, history }) => {
  const [formData, setFormData] = useState(initialPost);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
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
        placeholder="Title"
        name="title"
      />
      <input
        type="text"
        onChange={handleChange}
        value={formData.image}
        placeholder="Add image url"
        name="image"
      />
      <input
        type="text"
        onChange={handleChange}
        value={formData.servings}
        placeholder="Servings"
        name="servings"
      />
      <input
        type="text"
        onChange={handleChange}
        value={formData.calories}
        placeholder="Calories"
        name="calories"
      />
      <input type="submit" value={buttonLabel} />
    </form>
  );
};

export default Form;

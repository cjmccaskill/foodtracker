import React, { useState } from "react";
import { Link } from "react-router-dom";

const Form = ({ initialPost, handleSubmit, buttonLabel, history }) => {
  const [formData, setFormData] = useState(initialPost);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmission = (event) => {
    event.preventDefault();
    handleSubmit(formData);
    history.push("/allposts");
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
      <input className='submitbtn' type="submit" value={buttonLabel} />
      <Link to="/allposts">
        <button>Go Back</button>
      </Link>
    </form>
  );
};

export default Form;

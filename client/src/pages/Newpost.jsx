import React, { useState } from "react";
import { createPost } from "../api/Postapi";
import { toast } from "react-toastify";

function Newpost() {
  const [formdata, setFormdata] = useState({
    title: "",
    subtitle: "",
    content: "",
    category: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormdata((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Optional: Validate image size and type
    if (formdata.image && !formdata.image.type.startsWith("image/")) {
      toast.alert("Please upload a valid image file.");
      return;
    }

    const postData = new FormData();
    Object.keys(formdata).forEach((key) => {
      postData.append(key, formdata[key]);
    });

    try {
      await createPost(postData);
      toast.success("Post Created Successfully");
      // Reset form
      setFormdata({
        title: "",
        subtitle: "",
        content: "",
        category: "",
        image: null,
      });
    } catch (error) {
      console.error(error);
      toast.alert("Error in Creating Post");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Create New Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Enter Title..."
          value={formdata.title}
          onChange={handleChange}
          autoComplete="off"
          required
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          name="subtitle"
          placeholder="Enter Subtitle..."
          value={formdata.subtitle}
          onChange={handleChange}
          autoComplete="off"
          required
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <textarea
          name="content"
          placeholder="Content..."
          value={formdata.content}
          onChange={handleChange}
          autoComplete="off"
          required
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <select
          name="category"
          value={formdata.category}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded-md">
          <option value="">Select Category</option>
          <option value="tech">Tech</option>
          <option value="lifestyle">Lifestyle</option>
          <option value="education">Education</option>
        </select>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Newpost;

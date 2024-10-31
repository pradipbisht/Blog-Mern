import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPostById, getPostUpdate } from "../api/Postapi";
import { toast } from "react-toastify";

function EditPost() {
  const { id: postId } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    content: "",
    category: "",
    image: null,
  });
  const [existingImageUrl, setExistingImageUrl] = useState(null); // Store the existing image URL
  const [imagePreview, setImagePreview] = useState(null); // For image preview
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the post data on component mount
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await getPostById(postId);
        setFormData({
          title: response.data.title || "",
          subtitle: response.data.subtitle || "",
          content: response.data.content || "",
          category: response.data.category || "",
          image: null,
        });
        setExistingImageUrl(response.data.image); // Set the existing image URL
        setLoading(false);
      } catch (error) {
        toast.error("Unable to fetch post data");
        setError(error.message);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postId]);

  // Handle text input and select changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle image file change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        image: file, // Store the selected file
      }));
      setImagePreview(URL.createObjectURL(file)); // Set the preview URL for the image
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("subtitle", formData.subtitle);
    formDataToSend.append("content", formData.content);
    formDataToSend.append("category", formData.category);

    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    try {
      await getPostUpdate(postId, formDataToSend);
      toast.success("Data Updated");
      navigate("/");
    } catch (error) {
      toast.error("Unable to update post data");
      setError(error.message);
    }
  };

  if (loading) return <div>Loading post data...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-lg mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Edit Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Enter Title..."
          value={formData.title}
          onChange={handleChange}
          autoComplete="off"
          required
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          name="subtitle"
          placeholder="Enter Subtitle..."
          value={formData.subtitle}
          onChange={handleChange}
          autoComplete="off"
          required
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <textarea
          name="content"
          placeholder="Content..."
          value={formData.content}
          onChange={handleChange}
          autoComplete="off"
          required
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded-md">
          <option value="">Select Category</option>
          <option value="tech">Tech</option>
          <option value="lifestyle">Lifestyle</option>
          <option value="education">Education</option>
        </select>

        {/* Display existing image if available */}
        {existingImageUrl && !imagePreview && (
          <div>
            <p>Current Image:</p>
            <img
              src={existingImageUrl}
              alt="Current Post"
              className="w-full h-auto mt-2 mb-4 rounded-md"
            />
          </div>
        )}

        {/* Display selected image preview */}
        {imagePreview && (
          <div>
            <p>Image Preview:</p>
            <img
              src={imagePreview}
              alt="New Preview"
              className="w-full h-auto mt-2 mb-4 rounded-md"
            />
          </div>
        )}

        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
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

export default EditPost;

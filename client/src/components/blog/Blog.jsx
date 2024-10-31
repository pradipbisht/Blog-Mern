import React, { useEffect, useState } from "react";
import { getAllPosts, getPostDelete } from "../../api/Postapi";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null); // Track the post being deleted
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await getAllPosts();
      setPosts(response.data);
      setLoading(false);
    } catch (error) {
      console.log("Error", error);
      setError("Error fetching posts");
      setLoading(false);
    }
  };

  const handleDeleteClick = async (id) => {
    setDeleting(id);
    try {
      await getPostDelete(id);
      setPosts(posts.filter((post) => post._id !== id));
      toast.success("Post deleted successfully!", {
        position: "top-right",
      });
    } catch (error) {
      console.log("Error", error);
      toast.error("Failed to delete the post. Please try again.", {
        position: "top-right",
      });
    } finally {
      setDeleting(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-10 py-8">
      <div className="relative bg-gradient-to-r from-blue-500 to-green-500 text-white p-8 rounded-lg mb-8 overflow-hidden">
        <motion.h1
          className="text-5xl font-bold text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          whileHover={{ scale: 1.1, color: "#FFD700" }} // Change color on hover
        >
          Welcome to Our Blog
        </motion.h1>
        <p className="text-center text-lg uppercase mt-4">
          Discover our latest articles and insights
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <div
            key={post._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 transform hover:shadow-xl">
            <motion.div
              className="h-48 overflow-hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}>
              <img
                src={`http://localhost:5000/uploads/${post.images}`}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105 "
                onError={(e) => {
                  e.target.src = "path/to/your/fallback-image.jpg";
                }}
              />
            </motion.div>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {post.title.length > 20
                  ? post.title.substring(0, 20) + "..."
                  : post.title}
              </h2>
              <h3 className="text-lg text-gray-600 mb-4">{post.subtitle}</h3>
              <p className="text-gray-700 mb-4">
                {post.content.length > 100
                  ? post.content.substring(0, 100) + "..."
                  : post.content}
              </p>
              <h3 className="text-sm uppercase text-gray-500 mb-4">
                Category:{" "}
                <span className="text-black font-semibold">
                  {post.category}
                </span>
              </h3>

              <div className="flex space-x-4 mt-4">
                <Link to={`edit-post/${post._id}`}>
                  <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700 transition duration-300">
                    Edit
                  </button>
                </Link>
                <button
                  onClick={() => handleDeleteClick(post._id)}
                  disabled={deleting === post._id} // Disable button during deletion
                  className={`${
                    deleting === post._id
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-red-500 hover:bg-red-600"
                  } text-white px-4 py-2 rounded-md transition duration-300`}>
                  {deleting === post._id ? "Deleting..." : "Delete"}
                </button>

                <Link to={`/post/${post._id}`}>
                  <button className="bg-blue-500 border-2 border-blue-500 text-white px-4 py-2 rounded-md hover:bg-white hover:text-blue-500 hover:border-blue-500 transition duration-300">
                    Read More
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Blog;

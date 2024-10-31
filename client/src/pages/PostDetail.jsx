import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostById } from "../api/Postapi";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await getPostById(id);
        setPost(response.data);
      } catch (error) {
        setError("Failed to load post.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

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
    <div className="container mx-auto px-4 py-8">
      {post && (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <img
            src={`http://localhost:5000/uploads/${post.images}`}
            alt={post.title}
            className="w-full h-64 object-cover mb-4"
            onError={(e) => {
              e.target.src = "path/to/your/fallback-image.jpg";
            }}
          />
          <div className="p-6">
            <h1 className="text-4xl font-bold mb-2 text-gray-800">
              {post.title}
            </h1>
            <h2 className="text-2xl font-semibold mb-4 text-gray-600">
              {post.subtitle}
            </h2>
            <p className="text-lg text-gray-700 mb-4">{post.content}</p>
            <p className="text-sm text-gray-500">Category: {post.category}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostDetail;

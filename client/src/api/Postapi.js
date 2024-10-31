import axios from "axios";
const addUrl = "http://localhost:5000/server/posts";

export const createPost = (newPost) => axios.post(`${addUrl}/add`, newPost);

export const getAllPosts = (id) => axios.get(`${addUrl}/view`);

export const getPostById = (id) => axios.get(`${addUrl}/view/${id}`);

export const getPostDelete = (id) => axios.delete(`${addUrl}/delete/${id}`);

export const getPostUpdate = (id, updatedPost) =>
  axios.patch(`${addUrl}/update/${id}`, updatedPost);

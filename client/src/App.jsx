import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Blog from "./components/blog/Blog";
import Newpost from "./pages/Newpost";
import Editpost from "./pages/Editpost";
import PostDetail from "./pages/PostDetail";
import About from "./pages/About";
import PageNotFound from "./pages/PageNotfound";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] rounded-sm">
      <Navbar />
      <Routes>
        <Route path="/" element={<Blog />} />
        <Route path="/new-post" element={<Newpost />} />
        <Route path="/edit-post/:id" element={<Editpost />} />
        <Route path="/about" element={<About />} />
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="/pagenotfound" element={<PageNotFound/>} />
      </Routes>
      <ToastContainer
        position="bottom-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </div>
  );
}

export default App;

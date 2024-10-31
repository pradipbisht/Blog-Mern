import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ImPlus } from "react-icons/im";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <h1
            className="text-4xl font-bold agdasima-bold text-black cursor-pointer transition duration-300 hover:text-red-500"
            onClick={() => navigate("/")}>
            Day@2
          </h1>

          {/* Navigation divnks */}
          <nav>
            <div className="flex space-x-4 text-3xl font-bold agdasima-bold uppercase gap-4">
              <div>
                <Link
                  to="/"
                  className="text-gray-700 hover:text-amber-500 cursor-pointer">
                  Home
                </Link>
              </div>
              <div>
                <Link
                  to="/new-post"
                  className="text-gray-600 hover:text-amber-500 cursor-pointer">
                  <ImPlus className="mt-1" />
                </Link>
              </div>
              <div>
                <Link
                  to="/about"
                  className="text-gray-600 hover:text-amber-500 cursor-pointer">
                  About
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

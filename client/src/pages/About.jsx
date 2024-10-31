import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const About = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-200 px-4 py-6 h-[632px] text-gray-800 relative overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gray-300 bg-opacity-50"
        initial={{ opacity: 0.2 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
      />

      <motion.img
        src="https://media.licdn.com/dms/image/v2/D5635AQFPPr6KuqudRQ/profile-framedphoto-shrink_400_400/profile-framedphoto-shrink_400_400/0/1726540919660?e=1730962800&v=beta&t=T2Fn3CFazfV94VYOsa-h1kty8a0bWTZIorteuqpWV-I"
        alt="Profile"
        className="rounded-full mb-4 w-40 h-40 md:w-48 md:h-48"
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.6 }}
        whileHover={{ scale: 1.1, rotate: 5 }}
      />
      <motion.h1
        className="text-4xl font-bold mb-1"
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}>
        Pradip Bisht
      </motion.h1>
      <motion.p
        className="text-xl mb-3"
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}>
        Web Developer
      </motion.p>
      <div className="flex space-x-6 mb-3">
        <a
          href="https://github.com/pradipbisht"
          target="_blank"
          rel="noopener noreferrer">
          <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
            <FaGithub className="text-4xl hover:text-blue-600" />
          </motion.div>
        </a>
        <a
          href="https://www.linkedin.com/in/pradip-bisht-879753271"
          target="_blank"
          rel="noopener noreferrer">
          <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
            <FaLinkedin className="text-4xl hover:text-blue-600" />
          </motion.div>
        </a>
        <a
          href="https://x.com/Pradip91478309"
          target="_blank"
          rel="noopener noreferrer">
          <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
            <FaTwitter className="text-4xl hover:text-blue-600" />
          </motion.div>
        </a>
      </div>
      <p className="text-gray-600">
        Email:{" "}
        <a
          href="mailto:pradipbisht007@gmail.com"
          className="text-blue-500 hover:underline">
          pradipbisht007@gmail.com
        </a>
      </p>
    </div>
  );
};

export default About;

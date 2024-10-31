import express from "express";
import multer from "multer";
import Article from "../models/postmodel.js";
// const fs = require("fs");
import fs from "fs";

const router = express.Router();

// Test route
router.get("/", (req, res) => {
  res.send("this is test");
});

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

// Add article and upload image
router.post("/add", upload.single("image"), async (req, res) => {
  const { title, subtitle, content, category } = req.body;
  const image = req.file ? req.file.filename : null;

  try {
    const newArticle = new Article({
      title,
      subtitle,
      content,
      category,
      images: image,
    });

    // Save article to the database
    await newArticle.save();

    res
      .status(201)
      .json({ message: "Article created successfully", newArticle });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error: Unable to create article");
  }
});

// Data Show from database
router.get("/view", async (req, res) => {
  try {
    const articles = await Article.find();
    res.status(200).json(articles);
  } catch (error) {
    console.log("error in getting posts", error);
    // res.status(500).send("Server error");
  }
});

// Single Post Show
router.get("/view/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const article = await Article.findById(id);
    res.status(200).json(article);
  } catch (error) {
    console.log("error in getting posts", error);
    res.status(500).send("Server error");
  }
});

// Delete
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Article.findByIdAndDelete(id);
    res.status(200).send("Article deleted successfully");
  } catch (error) {
    console.error("Error deleteing post:", error);
    res.status(500).send("Server error");
  }
});

// Edit code

router.patch("/update/:id", upload.single("image"), async (req, res) => {
  const { id } = req.params;
  const { title, subtitle, content, category } = req.body;

  try {
    let article = await Article.findById(id);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    const oldImagePath = article.images; // Store the old image path

    // Update article fields
    article.title = title || article.title;
    article.subtitle = subtitle || article.subtitle;
    article.content = content || article.content;
    article.category = category || article.category;

    if (req.file) {
      // If a new image is uploaded
      article.images = req.file.filename;

      // Delete the old image file
      fs.unlink(`uploads/${oldImagePath}`, (err) => {
        if (err) {
          console.error("Failed to delete old image:", err);
        } else {
          console.log("Old image deleted successfully");
        }
      });
    }

    const updatedArticle = await article.save();
    res.status(200).json(updatedArticle);
  } catch (error) {
    console.error("Error updating the post", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;

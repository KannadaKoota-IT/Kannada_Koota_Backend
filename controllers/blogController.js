import Blog from "../models/blog_model.js";

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, blogs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single blog
// @route   GET /api/blogs/:id
// @access  Public
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }
    res.status(200).json({ success: true, blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create a blog
// @route   POST /api/blogs
// @access  Admin
export const createBlog = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    let imageUrl = "";

    if (req.file) {
      imageUrl = req.file.path;
    }

    if (!title || !content || !author) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    const blog = await Blog.create({
      title,
      content,
      author,
      imageUrl,
    });

    res.status(201).json({ success: true, blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete a blog
// @route   DELETE /api/blogs/:id
// @access  Admin
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    await Blog.findByIdAndDelete(req.params.id);

    res
      .status(200)
      .json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Add a review
// @route   POST /api/blogs/:id/review
// @access  Public
export const addReview = async (req, res) => {
  try {
    const { name, comment, rating } = req.body;
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }

    if (!rating || !comment) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide rating and comment" });
    }

    const review = {
      name: name || "Anonymous",
      rating: Number(rating),
      comment,
      date: Date.now(),
    };

    blog.reviews.push(review);
    blog.ratings.push(Number(rating));

    await blog.save();

    res.status(201).json({ success: true, message: "Review added", blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

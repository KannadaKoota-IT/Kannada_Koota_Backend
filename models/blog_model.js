import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Blog title is required"],
    },
    content: {
      type: String,
      required: [true, "Blog content is required"],
    },
    author: {
      type: String,
      required: [true, "Author name is required"],
    },
    imageUrl: {
      type: String,
      default: "",
    },
    ratings: {
      type: [Number],
      default: [],
    },
    reviews: [
      {
        name: { type: String, default: "Anonymous" },
        comment: { type: String, required: true },
        rating: { type: Number, required: true },
        date: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;

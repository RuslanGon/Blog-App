import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: { type: String },
  desc: { type: String },
  file: { type: String },
});

const PostModel = mongoose.model("Post", postSchema);

export default PostModel;
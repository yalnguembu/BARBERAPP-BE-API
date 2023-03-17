import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  title: {
    type: String,
  },
  summary: {
    type: String,
    required: true,
    unique: true,
  },
});
const categoryModel = mongoose.model("user", CategorySchema);

export { categoryModel };

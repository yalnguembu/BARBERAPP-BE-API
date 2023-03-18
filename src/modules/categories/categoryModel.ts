import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: true,
  },
  summary: {
    type: String,
  },
});
const categoryModel = mongoose.model("category", CategorySchema);

export { categoryModel };

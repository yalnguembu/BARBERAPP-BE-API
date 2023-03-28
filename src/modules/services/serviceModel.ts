import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    require: true,
    default: "service-default.png",
  },
  price: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
});
const serviceModel = mongoose.model("service", ServiceSchema);

export { serviceModel };

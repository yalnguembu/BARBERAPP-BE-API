import mongoose from "mongoose";

const ReservationSchema = new mongoose.Schema({
  service: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  client: {
    type: String,
    require: true,
  },
  maker: {
    type: Number,
    required: true,
    default: "bay",
  },
});
const reservationModel = mongoose.model("service", ReservationSchema);

export { reservationModel };

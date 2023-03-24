import mongoose from "mongoose";

const ReservationSchema = new mongoose.Schema({
  service: {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    duration: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  client: {
    id: {
      type: String,
      require: true,
    },
    username: {
      type: String,
    },
    email: {
      type: String,
      require: true,
    },
  },
  maker: {
    type: String,
    required: true,
    default: "anyone",
  },
  isCanceled: {
    type: Boolean,
    require: true,
    default: false,
  },
});

const reservationModel = mongoose.model("reservation", ReservationSchema);

export { reservationModel };

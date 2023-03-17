// const router = require("express").Router();
// const Reservation = require("../models/Reservation");

// router.post("/", async (req, res) => {
//   const newReservation = new Reservation(req.body);
//   try {
//     const savedReservation = await newReservation.save();
//     res.status(200).json(savedReservation);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.put("/:id", async (req, res) => {
//   try {
//     const updatedReservation = await Reservation.findByIdAndUpdate(
//       req.params.id,
//       {
//         $set: req.body,
//       },
//       { new: true },
//     );
//     res.status(200).json(updatedReservation._doc);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // effacer Reservation
// router.delete("/:id", async (req, res) => {
//   try {
//     const Reservation = await Reservation.findById(req.params.id);
//     try {
//       await Reservation.delete();
//       res.status(200).json("tache effacer");
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // //get all Reservations
// router.get("/", async (req, res) => {
//   try {
//     const reservation = await Reservation.find();
//     res.status(200).json(reservation);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// module.exports = router;

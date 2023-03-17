// const router = require("express").Router();
// const Realisation = require("../models/Realisation");

// router.post("/", async (req, res) => {
//   const newRealisation = new Realisation(req.body);
//   try {
//     const savedRealisation = await newRealisation.save();
//     res.status(200).json(savedRealisation);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.put("/:id", async (req, res) => {
//   try {
//     const updatedRealisation = await Realisation.findByIdAndUpdate(
//       req.params.id,
//       {
//         $set: req.body,
//       },
//       { new: true },
//     );
//     res.status(200).json(updatedRealisation._doc);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // effacer Realisation
// router.delete("/:id", async (req, res) => {
//   try {
//     const Realisation = await Realisation.findById(req.params.id);
//     try {
//       await Realisation.delete();
//       res.status(200).json("tache effacer");
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // //get all Realisations
// router.get("/", async (req, res) => {
//   try {
//     const Realisation = await Realisation.find();
//     res.status(200).json(Realisation);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// module.exports = router;

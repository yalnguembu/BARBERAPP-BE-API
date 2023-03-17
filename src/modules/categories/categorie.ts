// const router = require("express").Router();
// const Categorie = require("../models/categorie");

// // cree une Categorie
// router.post("/", async (req, res) => {
//   try {
//     const newCategorie = new Categorie(req.body);
//     const categorie = await newCategorie.save();
//     res.status(200).json(categorie);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });
// // effacer Categorie
// router.delete("/:id", async (req, res) => {
//   try {
//     const categorie = await Categorie.findById(req.params.id);
//     try {
//       await categorie.delete();
//       res.status(200).json("categorie effacer");
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // //get all Categories
// // router.get("/", async (req, res) => {
// //   const { id } = req.params;
// //   try {
// //     Categorie
// //     // .find({ sender: /^/ })
// //       .aggregate([
// //         {
// //           $lookup: {
// //             from: "user",
// //             localField: "sender",
// //             foreignField: "_id",
// //             as: "user",
// //           },
// //         },
// //       ])
// //       .then((result) => {
// //         console.log(result);
// //       })
// //       .catch((err) => console.log(err));
// //     res.status(200).json("conversation");
// //   } catch (err) {
// //     res.status(500).json(err);
// //   }
// // });

// //get all categorie
// router.get("/", async (req, res) => {
//   try {
//     const categorie = await Categorie.find();
//     res.status(200).json(categorie);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// module.exports = router;

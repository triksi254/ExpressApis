const express = require("express");
const router = express.Router();
const User = require("../models/user");

//get a list of users from the db
router.get("/users", function (req, res, next) {
  User.aggregate([
    {
      $geoNear: {
        near: {
          type: "Point",
          coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)],
        },
        distanceField: "distance",
        maxDistance: 100000,
        spherical: true,
      },
    },
  ])
    //No longer used as of Moongoose version@5
    // User.geoNear(
    //   {
    //     type: "Point",
    //     coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)],
    //   },
    //   { maxDistance: 100000, spherical: true }
    // )

    .then(function (users) {
      res.send(users);
    })
    .catch(next);
});

//add a user in the db
router.post("/users", function (req, res, next) {
  User.create(req.body)
    .then(function (user) {
      res.send(user);
    })
    .catch(next);
});

//update a user in the db
router.put("/users/:id", function (req, res, next) {
  User.findByIdAndUpdate({ _id: req.params.id }, req.body)
    .then(function () {
      User.findOne({ _id: req.params.id }).then(function (user) {
        res.send(user);
      });
    })
    .catch(next);
});

//delete a user from the db
router.delete("/users/:id", function (req, res, next) {
  User.findByIdAndRemove({ _id: req.params.id })
    .then(function (user) {
      res.send(user);
    })
    .catch(next);
});
module.exports = router;

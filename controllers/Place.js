// CREATE A NEW EXPRESS ROUTE
const router = require("express").Router();

const { Router } = require("express");
//IMPORT OUR MODEL
const Place = require("../models/Place");

// SEED DATA FOR SEED ROUTE
const placeSeed = [
  {
    name: "Candy Kingdom",
    img: "https://i.pinimg.com/originals/b2/47/0f/b2470f5497b793eeaf48f8dca6f9750c.jpg",
    description: "Nearly everything within the Candy Kingdom is composed of some form of candy or sweet. This includes the buildings and infrastructure inside of the kingdom's walls. Even the ground in the kingdom is edible, from the peanut brittle streets to the chocolate dirt seen in episode Too Young.",
  },
  {
    name: "Breakfast Kingdom",
    img: "https://static.wikia.nocookie.net/adventuretimewithfinnandjake/images/d/d5/S6e14_Breakfast_Kingdom.png/revision/latest/top-crop/width/360/height/360?cb=20140802184719",
    description: "The Breakfast Kingdom is a state located in the Desert Lands. It is ruled by Breakfast Princess, Toast Princess, and Strudel Princess and is inhabited by Breakfast People.",
  },
  {
    name: "Earldom of Lemongrab",
    img: "https://cdn.wallpapersafari.com/85/1/U5Qtek.png",
    description: "Earldom of Lemongrab (better known as Lemongrab) is an earldom currently ruled by the third Earl of Lemongrab. It is located in the Land of Ooo and is a subordinate territory of the Candy Kingdom.",
  },
];

// ROUTES (async, since database actions are asynchronous)

// Seed Route for Seeding Database
router.get("/seed", async (req, res) => {
  // try block for catching errors
  try {
    // remove all places from database
    await Place.remove({});
    // add the seed data to the database
    await Place.create(placeSeed);
    // get full list of places to confirm seeding worked
    const places = await Place.find({});
    // return full list of places as JSON
    res.json(places);
  } catch (error) {
    // return error as JSON with an error status
    res.status(400).json(error);
  }
});

// Index Route
router.get("/", async (req, res) => {
  try {
    console.count()
    // query database for all the places
    const places = await Place.find({});
    // send places as JSON
    console.count()
    res.json(places);
  } catch (error) {
    // return error as JSON with an error status
    res.status(400).json(error);
  }
});

// CREATE Route
router.post("/", async (req, res) => {
  try {
    // pass the request body to create a new place in the database
    const newPlace = await Place.create(req.body);
    // send newly created place back as JSON
    res.json(newPlace);
  } catch (error) {
    // return error as JSON with an error status
    res.status(400).json(error);
  }
});

// update Route
router.put("/:id", async (req, res) => {
  try {
    // pass the request body to update and existing place in the database
    const updatedPlace = await Place.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    // send newly updated place back as JSON
    res.json(updatedPlace);
  } catch (error) {
    // return error as JSON with an error status
    res.status(400).json(error);
  }
});

// update Route
router.delete("/:id", async (req, res) => {
    try {
      // delete existing place in the database
      const deletedPlace = await Place.findByIdAndRemove(req.params.id);
      // send delete place back as JSON
      res.json(deletedPlace);
    } catch (error) {
      // return error as JSON with an error status
      res.status(400).json(error);
    }
  });

// export the router which has all our routes registered to it
module.exports = router;
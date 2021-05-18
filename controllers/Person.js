// CREATE A NEW EXPRESS ROUTE
const router = require("express").Router();

const { Router } = require("express");
//IMPORT OUR MODEL
const Place = require("../models/Place");

// SEED DATA FOR SEED ROUTE
const placeSeed = [
    {
        name:"Finn Mertins",
        img: "https://i.ytimg.com/vi/dMf8l06OWY0/maxresdefault.jpg",
        race: "Human",
        description: "The show's protagonist, Finn is a kind, brave, selfless, and righteous boy. His aspirations to become a great hero makes him somewhat of a moral sheriff in the Land of Ooo, as he is willing to help and protect any innocent person or creature. Finn has a very strong sense of responsibility and becomes upset when he is unable to help others.",
      },
      {
        name: String,
        img: String,
        race: String,
        description: String,
      },
      {
        name: String,
        img: String,
        race: String,
        description: String,
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
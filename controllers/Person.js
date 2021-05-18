// CREATE A NEW EXPRESS ROUTE
const router = require("express").Router();

const { Router } = require("express");
//IMPORT OUR MODEL
const Person = require("../models/Person");

// SEED DATA FOR SEED ROUTE
const personSeed = [
    {
        name:"Finn (The Hero) Mertins",
        img: "https://i.ytimg.com/vi/dMf8l06OWY0/maxresdefault.jpg",
        race: "Human",
        description: "The show's protagonist, Finn is a kind, brave, selfless, and righteous boy. His aspirations to become a great hero makes him somewhat of a moral sheriff in the Land of Ooo, as he is willing to help and protect any innocent person or creature. Finn has a very strong sense of responsibility and becomes upset when he is unable to help others.",
      },
      {
        name: "Princess (Bonnie) Bubblegum",
        img: "https://wallpapercave.com/wp/wp3190796.png",
        race: "Candy Person",
        description: "Princess Bubblegum is the current incarnation of the Candy Elemental, comparable to the inhabitants of the Candy Kingdom, who are all composed of types of desserts and candies. She rules over the Candy Kingdom. PB has received harsh critisms, for the way she nonchantly causes turmoil by destroying/mistreatment unwanted creations",
      },
      {
        name: "Marceline (The Vampire Queen) Abadeer",
        img: "https://static.wikia.nocookie.net/adventuretimewithfinnandjake/images/4/49/Stakes_Promo_Art.png/revision/latest?cb=20151117190226",
        race: "Vampire/Demon",
        description: "Marceline is a fun-loving 1,000-year-old vampire queen. Unlike a traditional vampire, Marceline does not need to drink blood to survive; rather, she eats the color red. Marceline is also an avid musician who plays an electric bass that she made from her family's heirloom battle-axe.",
      },
      {
        name: "Huntress Wizard",
        img: "https://static.wikia.nocookie.net/adventuretimewithfinnandjake/images/6/6f/Huntress.png/revision/latest?cb=20120811131500",
        race: "Humanoid/Grass Wizard",
        description: "She is initially shown as laid-back, and appears to have a sarcastic and insolent approach to things. It was later shown in Flute Spell, that she is one of a single-minded focus, only being able to see what is in front of her. She has a fear of becoming soft, so strong that it led her to the madness and sadness which comes with wizardry.",
      },
];

// ROUTES (async, since database actions are asynchronous)

// Seed Route for Seeding Database
router.get("/seed", async (req, res) => {
  // try block for catching errors
  try {
    // remove all people from database
    await Person.remove({});
    // add the seed data to the database
    await Person.create(personSeed);
    // get full list of people to confirm seeding worked
    const people = await Person.find({});
    // return full list of people as JSON
    res.json(people);
  } catch (error) {
    // return error as JSON with an error status
    res.status(400).json(error);
  }
});

// Index Route
router.get("/", async (req, res) => {
  try {
    console.count()
    // query database for all the people
    const people = await Person.find({});
    // send people as JSON
    console.count()
    res.json(people);
  } catch (error) {
    // return error as JSON with an error status
    res.status(400).json(error);
  }
});

// CREATE Route
router.post("/", async (req, res) => {
  try {
    // pass the request body to create a new person in the database
    const newPerson = await Person.create(req.body);
    // send newly created person back as JSON
    res.json(newPerson);
  } catch (error) {
    // return error as JSON with an error status
    res.status(400).json(error);
  }
});

// update Route
router.put("/:id", async (req, res) => {
  try {
    // pass the request body to update and existing person in the database
    const updatedPerson = await Person.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    // send newly updated person back as JSON
    res.json(updatedPerson);
  } catch (error) {
    // return error as JSON with an error status
    res.status(400).json(error);
  }
});

// update Route
router.delete("/:id", async (req, res) => {
    try {
      // delete existing person in the database
      const deletedPerson = await Person.findByIdAndRemove(req.params.id);
      // send delete person back as JSON
      res.json(deletedPerson);
    } catch (error) {
      // return error as JSON with an error status
      res.status(400).json(error);
    }
  });

// export the router which has all our routes registered to it
module.exports = router;
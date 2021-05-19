// CREATE A NEW EXPRESS ROUTE
const router = require("express").Router();

const { Router } = require("express");

//IMPORT OUR MODEL
const MagikItem = require("../models/MagikItem");

// SEED DATA FOR SEED ROUTE
const magikitemSeed = [
    {
        name:"The Enchiridion",
        img: "https://static.wikia.nocookie.net/adventuretimewithfinnandjake/images/8/8e/Enchiridion.png/revision/latest/scale-to-width-down/620?cb=20191218042300",
        cursed: false,
        description: "The Enchiridion (which translates to The Handbook or The Manual) was an ancient book with codes of conduct, guidelines, and other helpful information for heroes. The book had great power which allowed it to tear open worm holes between dimensions in the multiverse.",
      },
      {
        name: "Demon Blood Sword",
        img: "https://i.pinimg.com/originals/d0/16/ef/d016ef7fcdba3d01b39084e8a604c2ac.png",
        cursed: false,
        description: "The sword's creation was shown in a videotape in The Pit, where Kee-Oth created it from his own blood after being captured by Joshua, as a way to escape. When Kee-Oth tried to steal Joshua's blood, he was stunned by holy water that Joshua had been drinking, which infused his blood with elements dangerous to Kee-Oth.",
      },
      {
        name: "The Grass Sword",
        img: "https://pm1.narvii.com/6081/615718d5f4319eb78750700bddb8d0050b3cc988_hq.jpg",
        cursed: true,
        description: "Finn is able to use the sword with extreme precision. This is to the point that he can quickly carve his face into various objects. Also, when Finn flicks the sword, it whirls in deadly circles like a helicopter blade.The grass sword also possesses abilities resulting from its curse. The sword incessantly follows Finn; when Finn tries to cast it away, he soon finds himself holding the sword again. When Finn accepts that the sword is cursed, he becomes able to control its material state—he can toggle between wearing the sword around his right arm as a bracelet and extending it as a sword.",
      },
      {
        name: "Demonic Wishing Eye",
        img: "https://static.wikia.nocookie.net/adventuretimewithfinnandjake/images/3/31/S4_E24_Magic_wishing_eye.PNG/revision/latest/scale-to-width-down/1000?cb=20130818005128",
        cursed: true,
        description: "the eye has the ability to create an unlimited supply of extremely powerful doppelgangers of the wearer; these doppelgangers are impossible to defeat but still have the will and mindset of the wearer. The Demonic Wishing Eye takes a piece of one's soul each time it is used. A small creature named Wishy lives inside it.",
      },
];

// ROUTES (async, since database actions are asynchronous)

// Seed Route for Seeding Database
router.get("/seed", async (req, res) => {
  // try block for catching errors
  try {
    // remove all MagikItems from database
    await MagikItem.remove({});
    // add the seed data to the database
    await MagikItem.create(magikitemSeed);
    // get full list of magikitems to confirm seeding worked
    const magikitems = await MagikItem.find({});
    // return full list of magikitems as JSON
    res.json(magikitems);
  } catch (error) {
    // return error as JSON with an error status
    res.status(400).json(error);
  }
});

// Index Route
router.get("/", async (req, res) => {
  try {
    console.count()
    // query database for all the magikitems
    const magikitems = await MagikItem.find({});
    // send magikitems as JSON
    console.count()
    res.json(magikitems);
  } catch (error) {
    // return error as JSON with an error status
    res.status(400).json(error);
  }
});

// CREATE Route
router.post("/", async (req, res) => {
  try {
    // pass the request body to create a new magikitem in the database
    const newMagikItem = await MagikItem.create(req.body);
    // send newly created magikitem back as JSON
    res.json(newMagikItem);
  } catch (error) {
    // return error as JSON with an error status
    res.status(400).json(error);
  }
});

// update Route
router.put("/:id", async (req, res) => {
  try {
    // pass the request body to update and existing magikitem in the database
    const updatedMagikItem = await MagikItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    // send newly updated magikitem back as JSON
    res.json(updatedMagikItem);
  } catch (error) {
    // return error as JSON with an error status
    res.status(400).json(error);
  }
});

// update Route
router.delete("/:id", async (req, res) => {
    try {
      // delete existing magikitem in the database
      const deletedMagikItem = await MagikItem.findByIdAndRemove(req.params.id);
      // send delete magikitem back as JSON
      res.json(deletedMagikItem);
    } catch (error) {
      // return error as JSON with an error status
      res.status(400).json(error);
    }
  });

// export the router which has all our routes registered to it
module.exports = router;
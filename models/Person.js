// Import Mongoose
const mongoose = require("mongoose");

// Pull Schema and model from mongoose
const Schema = mongoose.Schema;
const model = mongoose.model;

// Create Person Schema
const personSchema = new Schema(
  {
    name: String,
    img: String,
    race: String,
    description: String,
  },
  { timestamps: true }
);

// Create our Model Object
const Person = model("Person", personSchema);

// Export our Model Object
module.exports = Person;
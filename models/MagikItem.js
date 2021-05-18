// Import Mongoose
const mongoose = require("mongoose");

// Pull Schema and model from mongoose
const Schema = mongoose.Schema;
const model = mongoose.model;

// Create MagikItem Schema
const magikitemSchema = new Schema(
  {
    name: String,
    img: String,
    cursed: Boolean,
    description: String,
  },
  { timestamps: true }
);

// Create our Model Object
const MagikItem = model("MagikItem", magikitemSchema);

// Export our Model Object
module.exports = MagikItem;
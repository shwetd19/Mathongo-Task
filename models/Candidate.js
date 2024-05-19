const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema({
  name: String,
  email: String,
  city: String,
});

const Candidate = mongoose.model("Candidate", candidateSchema);

module.exports = Candidate;

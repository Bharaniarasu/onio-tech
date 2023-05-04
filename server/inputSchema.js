const mongoose = require("mongoose");

const InputSchema = mongoose.Schema({
  Name: {
    type: String,
    required: true,
    trim: true,
  },
  Age: {
    type: Date,
    required: true,
  },
  Sex: {
    type: String,
    required: true,
  },
  IDType: { type: String },
  IDNumber: { type: String },
  EmergencyContact: { type: String },
  Mobile: { type: String },
  GuardianLabel: { type: String },
  GuardianName: { type: String },
  Mail: { type: String },
  Address: { type: String },
  Country: { type: String },
  State: { type: String },
  City: { type: String },
  PIN: { type: String },
  Occupation: { type: String },
  Religion: { type: String },
  MaritalStatus: { type: String },
  BloodGroup: { type: String },
  Nationality: { type: String },

  createdTime: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Details", InputSchema);

const express = require("express");
const router = express.Router();
const InputSchema = require("./inputSchema");

router.post("/", async (req, res) => {
  let data = new InputSchema({
    Name: req.body.data.uName,
    Age: req.body.data.age,
    Sex: req.body.data.sex,
    IDType: req.body.data.idType,
    IDNumber: req.body.data.idNumber,
    EmergencyContact: req.body.data.emergencyContact,
    Mobile: req.body.data.mobile,
    GuardianLabel: req.body.data.guardianLabel,
    GuardianName: req.body.data.guardian,
    Mail: req.body.data.mail,
    Address: req.body.data.address,
    Country: req.body.data.country,
    State: req.body.data.state,
    City: req.body.data.city,
    PIN: req.body.data.PIN,
    Occupation: req.body.data.occupation,
    Religion: req.body.data.religion,
    MaritalStatus: req.body.data.maritalStatus,
    BloodGroup: req.body.data.bloodGroup,
    Nationality: req.body.data.nationality,
  });
  await data.save();
  console.log(req.body);
  res.send(req.body);
});

router.get("/", async (req, res) => {
  let findData = await InputSchema.find();
  res.json(findData);
  // res.send(req.body);
});

module.exports = router;

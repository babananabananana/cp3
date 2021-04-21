const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

const users = require("./user.js");
const User = users.model;
const validUser = users.valid;

const timeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  time: Number,
  name: String,
  created: {
    type: Date,
    default: Date.now
  },
});

const Time = mongoose.model('Time', timeSchema);

router.get("/", validUser, async(req,res) => {
  try{
    let time = await Time.find({
      user: req.user,
    }).sort({
      created:-1
    });
    return res.send(time);
  } catch(error){
    console.log(error);
    return res.sendStatus(500);
  }
});

router.post("/", validUser, async (req,res) =>{
  try{
    let time = new Time({
      user: req.user,
      time: req.body.time,
      name: req.body.name,
    });
    await time.save();
    return res.sendStatus(200);
  } catch(error){
    console.log(error);
    return res.sendStatus(500);
  }
});
router.get("/all", async (req, res) => {
  try {
    let times = await Time.find().sort({
      created: -1
    }).populate('user');
    return res.send(times);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.delete("/:id", validUser, async(req,res) => {
  try{
    await Time.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch(error){
    console.log(error);
    return res.sendStatus(500);
  }
});



module.exports = {
  model: Time,
  routes: router,
}

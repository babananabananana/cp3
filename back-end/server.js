const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();


app.use(bodyParser.urlencoded({
  extended: false
}));


app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/buttonGame', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const userSchema =  new mongoose.Schema({
    name: String,
    time: Number,
});

const User = mongoose.model('User', userSchema);

app.post('/api/user', async(req, res) => {
    const user = new User({
      name: req.body.name,
      time: req.body.time
    });
    try{
      await user.save();
      // res.send(user);
    } catch(error){
      console.log(error);
      res.sendStatus(500);
    }
});

app.get('/api/user', async (req, res)=>{
  try {
    let users = await User.find();
    res.send(users);
  }catch(error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/user/:id', async(req, res)=>{
  try {
    let item = await Item.findOne({_id:req.params.id})
    if(!item){
      res.send(404);
      return;
    }
    await item.delete();
    res.sendStatus(200);
  }catch(error){
    console.log(error);
    res.sendStatus(500);
  }
});


app.listen(3002, () => console.log('Server listening on port 3000!'));

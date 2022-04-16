const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/calender', {
  useNewUrlParser: true
});

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  month: Number,
  day: Number,
});

const Event = mongoose.model('Event', eventSchema);

app.post('/api/events', async (req, res) => {
  const anEvent = new Event({
    title: req.body.title,
    description: req.body.description,
    month: req.body.month,
    day: req.body.day,
  });
  try {
    await anEvent.save();
    res.send(anEvent);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get a list of all of the items in the museum.
app.get('/api/events', async (req, res) => {
  try {
    let events = await Event.find();
    res.send(events);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/events/:id', async (req, res) =>{
  try{
    await Event.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  }
  catch(error){
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/events/:id', async (req, res) =>{
  try{
    let eventX = await Event.findOne({
      _id: req.params.id
    });
    eventX.title = req.body.title;
    eventX.description = req.body.description;
    eventX.month = req.body.month;
    eventX.day = req.body.day;
    eventX.save();
    res.sendStatus(200);
  }
  catch(error){
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(3000, () => console.log('Server listening on port 3000!'));

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Campground = require('./models/campground')

mongoose.connect('mongodb://127.0.0.1:27017/camp-reviews');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error"));
db.once("open", () => {
    console.log("Databe Connected");
})

const app = express();

app.set('view wngine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.send('home')
})

app.get('/makecampground', async (req, res) => {
    const camp = new Campground({title: 'My Backyard', description: 'Camping'})
    await camp.save();
    res.send(camp);
})

app.listen(3000, () => {
    console.log('Serving on Port 3000');
})
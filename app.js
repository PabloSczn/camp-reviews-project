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

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.send('home')
})

app.get('/campgrounds', async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index.ejs', {campgrounds})
})

app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new.ejs');
})

app.post('/campgrounds', async (req, res) => {
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`)
})

app.get('/campgrounds/:id', async (req, res) => {
    const id = req.params.id;
    const campground = await Campground.findById(id);
    res.render('campgrounds/show.ejs', {campground})
});

app.listen(3000, () => {
    console.log('Serving on Port 3000');
})
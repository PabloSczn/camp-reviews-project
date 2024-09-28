// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const ejsMate = require('ejs-mate'); // EJS layout support
const Joi = require('joi');
const ExpressError = require('./utils/ExpressError'); // Custom error class
const methodOverride = require('method-override'); // To support PUT and DELETE from forms
const Campground = require('./models/campground'); // Campground model
const catchAsync = require('./utils/catchAsync'); // Error handling wrapper

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/camp-reviews');
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:")); // Log connection errors
db.once("open", () => {
    console.log("Database Connected"); // Confirm successful connection
});

const app = express();

// Setup EJS engine and views folder
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to parse request body and support method override
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

// Route for the home page
app.get('/', (req, res) => {
    res.send('home'); // Simple response for demo purposes
});

// Route to list all campgrounds
app.get('/campgrounds', catchAsync(async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index.ejs', {campgrounds}); // Pass campgrounds to the template
}));

// Route to show form for creating a new campground
app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new.ejs');
});

// Route to create a new campground
app.post('/campgrounds', catchAsync(async (req, res, next) => {
    const campgroundSchema = Joi.object({
        campground : Joi.object({
            title: Joi.string().required(),
            price: Joi.number().required().min(0),
            location: Joi.string().required(),
        }).required
    })

    const {error} = campgroundSchema.validate(req.body);

    if(error){
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    }

    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`);
}));

// Route to show form for editing a campground
app.get('/campgrounds/:id/edit', catchAsync(async (req, res) => {
    const id = req.params.id;
    const campground = await Campground.findById(id);
    res.render('campgrounds/edit.ejs', {campground});
}));

// Route to view a single campground
app.get('/campgrounds/:id', catchAsync(async (req, res) => {
    const id = req.params.id;
    const campground = await Campground.findById(id);
    res.render('campgrounds/show.ejs', {campground});
}));

// Route to update a campground
app.put('/campgrounds/:id', catchAsync(async (req, res) => {
    const id = req.params.id;
    const campground = await Campground.findByIdAndUpdate(id, {...req.body.campground});
    res.redirect(`/campgrounds/${campground._id}`);
}));

// Route to delete a campground
app.delete('/campgrounds/:id', catchAsync(async (req, res) => {
    const id = req.params.id;
    await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds');
}));

// Catch-all route for undefined paths
app.all(/(.*)/, (req, res, next) => { // Catch-all route to handle all other paths
    next(new ExpressError('Page not found', 404)); // Forward to error handler
})

// Error handling middleware
app.use((err, req, res, next) => {
    const {statusCode = 500} = err; // Default error status
    if(!err.message) err.message = 'Something went wrong' // Default error message
    res.status(statusCode).render('error', {err}); // Send the error message with the status code
})

// Start the server
app.listen(3000, () => {
    console.log('Serving on Port 3000'); // Log that the server is running
});

const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');


mongoose.connect('mongodb://127.0.0.1:27017/camp-reviews');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error"));
db.once("open", () => {
    console.log("Databe Connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDb = async()=> {
    await Campground.deleteMany({});
    for(let i = 0; i < 50; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://picsum.photos/400?random=${Math.random()}',
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt necessitatibus accusantium fugit temporibus neque, quia ipsam reprehenderit sed nobis iusto laudantium quod velit eum illum nostrum voluptates dicta libero! Exercitationem.',
            price
        });
        await camp.save();
    }
}

seedDb().then(() => {
    mongoose.connection.close();
});
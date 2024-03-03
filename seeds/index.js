const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers')
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/YelpCamp',)
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    });

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () =>  {
    await Campground.deleteMany({});
    for(let i = 0; i < 300; i++){
        const random1000 = Math.floor(Math.random() * 1000)
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            author: '65bb09c09415f79a2354204d',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic, sint similique, quidem quae consectetur iusto dolorem sapiente nesciunt numquam corporis magni laudantium recusandae? Nesciunt voluptatem labore, illo quaerat consectetur sapiente?',
            price,
            images: [
                {
                  url: 'https://res.cloudinary.com/dn2hubzli/image/upload/v1708377834/YelpCamp/zi3hywdidhbaoveorlvx.jpg',
                  filename: 'YelpCamp/zi3hywdidhbaoveorlvx',
                },
                {
                  url: 'https://res.cloudinary.com/dn2hubzli/image/upload/v1708377834/YelpCamp/baziejdry4p6h4nwjpp0.jpg',
                  filename: 'YelpCamp/baziejdry4p6h4nwjpp0',
                }
              ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})
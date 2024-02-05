const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
    name: String,
    cuisine: String,
    city: String,
    restaurant_id: String,
    address: {
        building: String,
        street: String,
        zipcode: String
    }
});

const Restaurant = mongoose.model('restaurants', RestaurantSchema);

module.exports = Restaurant;

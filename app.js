const express = require('express');
const mongoose = require('mongoose');
const Restaurant = require('./models/restaurant');

const app = express();
app.use(express.json())

// Connect to MongoDB (Adjust the URI accordingly)
mongoose.connect('mongodb+srv://enessertkan:Password123@cluster0.55mfjdg.mongodb.net/restaurantDB?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Connected successfully to MongoDB");
});

// Define your REST API endpoints here
app.get('/restaurants', async (req, res) => {
    try {
        const restaurants = await Restaurant.find({});
        res.json(restaurants);
    } catch (error) {
        res.status(500).send(error);
    }
});


app.get('/restaurants/cuisine/:cuisine', async (req, res) => {
    try {
        const { cuisine } = req.params;
        const restaurants = await Restaurant.find({ cuisine });
        res.json(restaurants);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get('/restaurants', async (req, res) => {
    const { sortBy } = req.query;
    try {
        const order = sortBy.toUpperCase() === 'ASC' ? 1 : -1;
        const restaurants = await Restaurant.find({}).sort({ restaurant_id: order });
        res.json(restaurants);
    } catch (error) {
        res.status(500).send(error);
    }
});


app.get('/restaurants/Delicatessen', async (req, res) => {
    try {
        const restaurants = await Restaurant.find({ cuisine: "Delicatessen", city: { $ne: "Brooklyn" } }).sort('name');
        res.json(restaurants);
    } catch (error) {
        res.status(500).send(error);
    }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

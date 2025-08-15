const mongoose = require('mongoose');
require('dotenv').config();
const mongoURL = process.env.MONGO_URI;
const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true 
        });
        console.log('MongoDB connected successfully');
        const fetch_data = await mongoose.connection.db.collection("fooditems");
        const data = await fetch_data.find({}).toArray();
        
        
        const foodCategory = await mongoose.connection.db.collection("foodcategory");
        const catdata = await foodCategory.find({}).toArray();
            global.food_items = data;
            global.food_category = catdata;
         }   
    
         catch (err) {
        console.error("Error connecting to MongoDB or fetching data: ", err);
    }
};

module.exports = mongoDB;

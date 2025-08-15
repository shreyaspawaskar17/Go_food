const express = require('express');
const router = express.Router();
const { FoodItem, FoodCategory } = require('../models/FoodItem');  // import both from same file

router.get('/foodData', async (req, res) => {
  try {
    const foodItems = await FoodItem.find({});
    const foodCategories = await FoodCategory.find({});

    

    res.status(200).json([foodItems, foodCategories]);
  } catch (error) {
    console.error("Error fetching food data:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


module.exports = router;

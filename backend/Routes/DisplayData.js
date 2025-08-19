const express = require('express');
const router = express.Router();
const { FoodItem, FoodCategory } = require('../models/FoodItem');  // import both from same file

router.get('/foodData', async (req, res) => {
  try {
     res.send([global.food_items,global.food_category]);

  } catch (error) {
    console.error("Error fetching food data:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


module.exports = router;

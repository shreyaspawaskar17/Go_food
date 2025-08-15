const express = require('express');
const router = express.Router();
const { FoodItem } = require('../models/FoodItem'); // ✅ correct model import

const User = require('../models/User');

router.post('/AddFoodItem', async (req, res) => {
  const {
    email,
    adminEmail,
    categoryName,
    name,
    img,
    description,
    fullPlateCost,
    halfPlateCost
  } = req.body;

  const userEmail = email || adminEmail;
  console.log("📥 Incoming body:", req.body);

  try {
    // 1️⃣ Validate required fields
    if (!categoryName?.trim() || !name?.trim()) {
      return res.status(400).json({ success: false, message: "Category and name are required." });
    }

    // 2️⃣ Convert prices to numbers
    const full = Number(fullPlateCost);
    const half = Number(halfPlateCost);

    if (Number.isNaN(full) || Number.isNaN(half)) {
      return res.status(400).json({ success: false, message: "Invalid price(s). Must be numbers." });
    }

    // 3️⃣ Optional: check if user exists (admin or normal)
    if (userEmail) {
      const userExists = await User.exists({ email: userEmail });
      if (!userExists) {
        console.warn(`⚠ No user found for email: ${userEmail} — skipping user check.`);
      }
    }

    // 4️⃣ Create and save new food item
   const newFoodItem = new FoodItem({
  categoryName: categoryName.trim(),
  name: name.trim(),
  img: img?.trim() || "",
  description: description?.trim() || "",
  options: [
    { size: 'full', price: full },
    { size: 'half', price: half }
  ]
});


    const savedFoodItem = await newFoodItem.save();

    console.log("✅ Food item inserted successfully:", savedFoodItem);
    return res.status(201).json({ success: true, data: savedFoodItem });

  } catch (error) {
    console.error("❌ AddFoodItem error:", error);
    return res.status(500).json({ success: false, message: "Server error: " + error.message });
  }
});

module.exports = router;

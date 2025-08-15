const mongoose = require('mongoose');

// Option schema for food sizes and prices
const optionSchema = new mongoose.Schema({
  size: {
    type: String,
    required: true,
    enum: ['full', 'half']
  },
  price: {
    type: Number,
    required: true
  }
});

// FoodCategory schema
const foodCategorySchema = new mongoose.Schema({
  CategoryName: {
    type: String,
    required: true,
    unique: true
  }
}, {
  timestamps: true
});

// FoodItem schema
function arrayLimit(val) {
  return val.length === 2; 
}

const foodSchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  options: {
    type: [optionSchema],
    required: true,
    validate: [arrayLimit, '{PATH} exceeds the limit of 2'] 
  }
}, {
  timestamps: true
});

// Create models
const FoodItem = mongoose.model('fooditems', foodSchema);
const FoodCategory = mongoose.model('foodcategory', foodCategorySchema);

module.exports = {
  FoodItem,
  FoodCategory
};

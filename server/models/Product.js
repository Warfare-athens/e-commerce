
import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    images: [String],
    title: String,
    subtitle: String,
    description: String,
    size: String,
    category: String,
    brand: String,
    price: Number,
    salePrice: Number,
    totalStock: Number,
    averageReview: Number,
    benefits: [String], 
    ingredients: [String],
    howToUse: [String], 
  
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);
export default Product;
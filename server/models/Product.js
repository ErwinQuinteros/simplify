import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,       
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    price: {
        type: Number,
        default: 0
    },
    images: [String],
    stock: {
        type: Number,
        default: 0
    },
    category: {
        type: String,
    },
    tags: [String],
    isActive: {
        type: Boolean,
        default: true
    },  
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }

  },
  { timestamps: true }
);


const Product = mongoose.model("Product", productSchema);

export default Product;

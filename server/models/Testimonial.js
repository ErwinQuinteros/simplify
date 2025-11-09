import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
        trim: true,
  },
    message: {
        type: String,
        required: true,
        trim: true,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    photo: {
        type: String,
        default: null
    },
    date: {
        type: Date,
        default: Date.now,
    }
  },
  { timestamps: true }
);

const Testimonial = mongoose.model("Testimonial", testimonialSchema);

export default Testimonial;

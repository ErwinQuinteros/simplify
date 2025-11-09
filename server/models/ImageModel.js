import mongoose from "mongoose";
const { Schema } = mongoose;


const imageSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
    },
    description: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model("Image", imageSchema);
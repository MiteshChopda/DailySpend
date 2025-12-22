import mongoose from "mongoose";

const recordSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    amount: { type: Number, required: true },
    changeInBalance: {
        type: String,
        enum: ["spent", "added"],
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.models.Record || mongoose.model("Record", recordSchema);

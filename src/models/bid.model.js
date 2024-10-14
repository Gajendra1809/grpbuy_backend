import mongoose from "mongoose";

const bidSchema = new mongoose.Schema({
    bidAmountPerUnit: {
        type: Number,
        required: true
    },
    groupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group",
        required: true
    },
    bidderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    other: {
        type: String,
        max: 500
    }
}, {timestamps: true});
    
const Bid = mongoose.model("Bid", bidSchema);
export default Bid;

import mongoose, { SchemaType } from "mongoose";

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        max: 100
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    countBuyer: {
        type: Number,
        default: 0
    },
    buyers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    bidders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    openToBid: {
        type: Boolean,
        default: false
    },
    minCount: {
        type: Number,
        default: 0,
        required: true,
        max: 100
    },
    imageUrl: {
        type: String,
        default: ""
    }
}, {timestamps: true});

const Group = mongoose.model("Group", groupSchema);
export default Group;
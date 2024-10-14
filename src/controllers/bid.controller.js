import { errorResponse, successResponse } from "../utils/responses.js";
import Bid from "../models/bid.model.js";
import Group from "../models/group.model.js";

export const createBid = async (req, res) => {
    try {
        if(req.user.role !== "bidder") {
            return errorResponse(res, "Only bidder can create bids");
        }
        const group = await Group.findById(req.body.groupId);
        if(!group || !group.openToBid) {
            return errorResponse(res, "Group not found or its not open for bidding");   
        }
        if(group.bidders.includes(req.user._id)) {
            return errorResponse(res, "Bid already placed on this group, you can update your bid");
        }
        const bid = await Bid.create({
            bidAmountPerUnit: req.body.bidAmountPerUnit,
            groupId: req.body.groupId,
            bidderId: req.user._id,
            other: req.body.other
        });
        group.bidders.push(req.user._id);
        await group.save();
        return successResponse(res, bid, "Bid created successfully");
    } catch (error) {
        return errorResponse(res, error);
    }
}

export const updateBid = async (req, res) => {
    try {
        if(req.user.role !== "bidder") {
            return errorResponse(res, "Only bidder can update bids");
        }
        const bid = await Bid.findById(req.params.bidId);
        if(!bid) {
            return errorResponse(res, "Bid not found");
        }
        if(bid.bidderId.toString() !== req.user._id.toString()) {
            return errorResponse(res, "You are not authorized to update this bid");
        }
        bid.bidAmountPerUnit = req.body.bidAmountPerUnit;
        bid.other = req.body.other;
        await bid.save();
        return successResponse(res, bid, "Bid updated successfully");
    } catch (error) {
        return errorResponse(res, error);
    }
}

export const deleteBid = async (req, res) => {
    try {
        if(req.user.role !== "bidder") {
            return errorResponse(res, "Only bidder can delete bids");
        }
        const bid = await Bid.findById(req.params.bidId);
        if(!bid) {
            return errorResponse(res, "Bid not found");
        }
        if(bid.bidderId.toString() !== req.user._id.toString()) {
            return errorResponse(res, "You are not authorized to delete this bid");
        }
        const group = await Group.findById(bid.groupId);
        group.bidders = group.bidders.filter((bidder) => bidder.toString() !== req.user._id.toString());
        await group.save();
        await bid.deleteOne();
        return successResponse(res, null, "Bid deleted successfully");
    } catch (error) {
        return errorResponse(res, error.message);
    }
}

export const getBidByGroupId = async (req, res) => {
    try {
        const bids = await Bid.find({ groupId: req.params.groupId }).populate('bidderId').sort({ bidAmountPerUnit: 1 });
        return successResponse(res, bids, "Bids fetched successfully");
    } catch (error) {
        return errorResponse(res, error);
    }
}

export const getBidByBidderId = async (req, res) => {
    try {
        const bids = await Bid.find({ bidderId: req.user._id }).populate('groupId');
        return successResponse(res, bids, "Bids fetched successfully");
    } catch (error) {
        return errorResponse(res, error);
    }
}

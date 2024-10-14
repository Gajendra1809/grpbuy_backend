import { errorResponse, successResponse } from "../utils/responses.js";
import Group from "../models/group.model.js";

export const createGroup = async (req, res) => {
    try {
        if(req.user.role !== "admin") {
            return errorResponse(res, "Only admin can create groups");
        }
        const group = await Group.create({
            name: req.body.name,
            creator: req.user._id,
            categoryId: req.body.categoryId,
            minCount: req.body.minCount,
            imageUrl: req.body.imageUrl
        })
        return successResponse(res, group, "Group created successfully");
    } catch (error) {
        return errorResponse(res, error.message);
    }
}

export const getGroupById = async (req, res) => {
    try {
        const group = await Group.findById(req.params.groupId);
        if(!group) {
            return errorResponse(res, "Group not found");
        }
        return successResponse(res, group, "Group fetched successfully");
    } catch (error) {
        return errorResponse(res, error);
    }
}

export const getOpenGroups = async (req, res) => {
    try {
        const groups = await Group.find({ openToBid: true });
        return successResponse(res, groups, "Open groups fetched successfully");
    } catch (error) {
        return errorResponse(res, error);
    }
}

export const getAllGroups = async (req, res) => {
    try {
        const groups = await Group.find();
        return successResponse(res, groups, "Groups fetched successfully");
    } catch (error) {
        return errorResponse(res, error);
    }
}

export const applyToGroup = async (req, res) => {
    try {
        const { groupId } = req.body;
        const group = await Group.findById(groupId);
        if(!group) {
            return errorResponse(res, "Group not found");
        }
        if(group.buyers.includes(req.user._id)) {
            return errorResponse(res, "Already applied to this group");
        }
        group.buyers.push(req.user._id);
        group.countBuyer += 1;
        if(group.countBuyer >= group.minCount) {
            group.openToBid = true;
        }
        await group.save();
        return successResponse(res, null, "Applied to group successfully");
    } catch (error) {
        return errorResponse(res, error);
    }
}

export const cancelApplication = async (req, res) => {
    try {
        const { groupId } = req.body;
        const group = await Group.findById(groupId);
        if(!group) {
            return errorResponse(res, "Group not found");
        }
        if(!group.buyers.includes(req.user._id)) {
            return errorResponse(res, "You have not applied to this group");
        }
        if(group.openToBid) {
            return errorResponse(res, "Group is already open for bidding, now you cannot cancel your application");
        }
        group.buyers = group.buyers.filter((buyer) => buyer.toString() !== req.user._id.toString());
        group.countBuyer -= 1;
        await group.save();
        return successResponse(res, null, "Cancelled your application");
    } catch (error) {
        return errorResponse(res, error);
    }
}

export const getGroupsUserAppliedTo = async (req, res) => {
    try {
        const groups = await Group.find({ buyers: req.user._id });
        return successResponse(res, groups, "Groups fetched successfully");
    } catch (error) {
        return errorResponse(res, error);
    }
}
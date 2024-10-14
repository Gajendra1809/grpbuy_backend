import { errorResponse, successResponse } from "../utils/responses.js";
import User from "../models/user.model.js";
import Group from "../models/group.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        return successResponse(res, user, "User registered successfully, you can login now...");
    } catch (error) {
        return errorResponse(res, error.message);
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return errorResponse(res, "User not found");
        }
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordCorrect) {
            return errorResponse(res, "Incorrect password");
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        let data = {
            token,
            user   
        }
        return successResponse(res, data, "Login successful");
    } catch (error) {
        return errorResponse(res, error.message);
    }
}

export const logout = async (req, res) => {
    try {
        return successResponse(res, null, "Logout successful");
    } catch (error) {
        return errorResponse(res, error);
    }
}

export const getAllUsers = async (req, res) => {
    try {
        if (req.user.role !== "admin") {
            return errorResponse(res, "Only admin can request this data");   
        }
        const users = await User.find();
        return successResponse(res, users, "Users fetched successfully");
    } catch (error) {
        return errorResponse(res, error);
    }
}

export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        const groups = await Group.find({ creator: req.params.userId });
        const data = {
            user,
            groups
        }
        return successResponse(res, data, "User data fetched successfully");   
    } catch (error) {
        return errorResponse(res, error);
    }
}
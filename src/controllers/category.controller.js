import { errorResponse, successResponse } from "../utils/responses.js";
import Category from "../models/category.model.js";

export const createCategory = async (req, res) => {
    try {
        if(req.user.role !== "admin") {
            return errorResponse(res, "Only admin can create categories");
        }
        const category = await Category.create(req.body);
        return successResponse(res, category, "Category created successfully");
    } catch (error) {
        return errorResponse(res, error);
    }
}

export const getAllCategories = async (req, res) => {
    try {
        if(req.user.role !== "admin") {
            return errorResponse(res, "Only admin can request this data");
        }
        const categories = await Category.find();
        return successResponse(res, categories, "Categories fetched successfully");
    } catch (error) {
        return errorResponse(res, error);
    }
}
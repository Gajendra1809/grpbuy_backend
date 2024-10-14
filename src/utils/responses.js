export const successResponse = (res, data, message) => {
    return res.status(200).json({
        success: true,
        message,
        data
    });
};

export const errorResponse = (res, error) => {
    return res.status(400).json({
        success: false,
        error
    });
}
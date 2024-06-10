export const validateDimensions = (
    width: unknown,
    height: unknown,
    depth: unknown,
): string | null => {
    // Check if the values exist and are less than or equal to 0
    if (
        (width !== null && width !== undefined && Number(width) <= 0) ||
        (height !== null && height !== undefined && Number(height) <= 0) ||
        (depth !== null && depth !== undefined && Number(depth) <= 0)
    ) {
        return "Width, height, and depth must be greater than 0.";
    }
    // no error
    return null;
};

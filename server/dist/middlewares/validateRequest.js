import { z } from "zod";
const formatZodError = (error) => {
    const errors = {};
    error.errors.forEach((err) => {
        const path = err.path.join('.');
        if (!errors[path]) {
            errors[path] = [];
        }
        errors[path].push(err.message);
    });
    return {
        success: false,
        errors: Object.keys(errors).length > 0 ? errors : undefined,
        error: error.errors[0]?.message || "Validation failed"
    };
};
const validateRequest = (schema) => async (req, res, next) => {
    try {
        const result = await schema.safeParseAsync({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        if (!result.success) {
            res.status(400).json(formatZodError(result.error));
            return;
        }
        req.body = result.data.body ?? req.body;
        req.query = result.data.query ?? req.query;
        req.params = result.data.params ?? req.params;
        next();
        return;
    }
    catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json(formatZodError(error));
            return;
        }
        res.status(500).json({ success: false, message: "Internal server error" });
        return;
    }
};
export default validateRequest;
//# sourceMappingURL=validateRequest.js.map
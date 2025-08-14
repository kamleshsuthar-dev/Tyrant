"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const formatZodError = (error) => {
    var _a;
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
        error: ((_a = error.errors[0]) === null || _a === void 0 ? void 0 : _a.message) || "Validation failed"
    };
};
const validateRequest = (schema) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const result = yield schema.safeParseAsync({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        if (!result.success) {
            res.status(400).json(formatZodError(result.error));
            return;
        }
        req.body = (_a = result.data.body) !== null && _a !== void 0 ? _a : req.body;
        req.query = (_b = result.data.query) !== null && _b !== void 0 ? _b : req.query;
        req.params = (_c = result.data.params) !== null && _c !== void 0 ? _c : req.params;
        next();
        return;
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            res.status(400).json(formatZodError(error));
            return;
        }
        res.status(500).json({ success: false, message: "Internal server error" });
        return;
    }
});
exports.default = validateRequest;

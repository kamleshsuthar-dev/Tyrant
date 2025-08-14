"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authenticate_1 = require("../middlewares/auth/authenticate");
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const validateRequest_1 = __importDefault(require("../middlewares/validateRequest"));
const auth_schema_1 = require("../validations/zod/auth.schema");
exports.default = (router) => {
    router.post('/auth/register', (0, validateRequest_1.default)(auth_schema_1.registerUserSchema), auth_controller_1.default.registerUser);
    router.post('/auth/login', (0, validateRequest_1.default)(auth_schema_1.loginUserSchema), auth_controller_1.default.loginUser);
    router.get('/auth/google', (0, validateRequest_1.default)(auth_schema_1.googleAuthSchema), auth_controller_1.default.googleAuth);
    router.post('/auth/logout', auth_controller_1.default.logoutUser);
    router.post('/auth/reset-password', (0, validateRequest_1.default)(auth_schema_1.resetPasswordSchema), auth_controller_1.default.resetPassword);
    router.get('/auth/isregistered', (0, validateRequest_1.default)(auth_schema_1.isRegisteredSchema), auth_controller_1.default.isRegistered);
    router.get('/auth/me', authenticate_1.verifyToken, auth_controller_1.default.getCurrentUser);
};

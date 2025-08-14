"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const auth_route_1 = __importDefault(require("../routes/auth.route"));
const category_route_1 = __importDefault(require("../routes/category.route"));
const product_route_1 = __importDefault(require("../routes/product.route"));
exports.default = () => {
    (0, auth_route_1.default)(router);
    (0, category_route_1.default)(router);
    (0, product_route_1.default)(router);
    return router;
};

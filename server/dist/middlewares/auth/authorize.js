"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSeller = exports.isAdmin = void 0;
const authorizeRole = (...roles) => {
    return (req, res, next) => {
        const user = req.user;
        if (!user || !roles.includes(user.role)) {
            res.status(403).json({
                success: false,
                message: `Access denied. Allowed roles: ${roles.join(", ")}`,
            });
            return;
        }
        next();
    };
};
exports.isAdmin = authorizeRole("admin");
exports.isSeller = authorizeRole("seller");

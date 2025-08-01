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
export const isAdmin = authorizeRole("admin");
export const isSeller = authorizeRole("seller");
//# sourceMappingURL=authorize.js.map
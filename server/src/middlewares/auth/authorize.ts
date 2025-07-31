import { Request, Response, NextFunction } from "express";

const authorizeRole = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as any;
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

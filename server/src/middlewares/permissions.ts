import { Request, Response, NextFunction } from "express";
import { Role } from "common-types";

export const requireRoles = (allowedRoles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const role = req.header("x-user-role");

    if (!role) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    if (!allowedRoles.includes(role as Role)) {
      res.status(403).json({
        error: "You do not have permission to perform this action"
      });
      return;
    }

    next();
  };
};

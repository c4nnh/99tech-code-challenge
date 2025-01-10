import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../libs/prisma";
import { UserRole } from "@prisma/client";
import * as authService from "../auth/auth.service";

export function authenticatedRequest(roles?: UserRole[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        req.ctx.logger.error("No token provided");
        res.status(401).json({ message: "No token provided" });
        return;
      }

      const token = authHeader.split(" ")[1];
      const jwtSecret = process.env.JWT_SECRET;

      if (!jwtSecret) {
        req.ctx.logger.error("JWT_SECRET is not defined");
        res.status(500).json({ message: "JWT_SECRET is not defined" });
        return;
      }

      const decoded = authService.verifyToken(token);

      // Get user from database
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
      });

      if (!user) {
        req.ctx.logger.error("User not found");
        res.status(401).json({ message: "User not found" });
        return;
      }

      // Check role if required
      if (roles?.length && !roles.includes(user.role)) {
        req.ctx.logger.error("Insufficient permissions");
        res.status(403).json({ message: "Insufficient permissions" });
        return;
      }

      // Add user to request object
      req.ctx.user = {
        id: user.id,
        role: user.role,
      };

      next();
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        req.ctx.logger.error("Invalid token", { error: error.message });
        res.status(401).json({ message: "Invalid token" });
        return;
      }

      req.ctx.logger.error("Internal server error", { error: error });
      res.status(500).json({ message: "Internal server error" });
      return;
    }
  };
}

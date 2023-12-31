import asyncHandler from "express-async-handler"
import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Response } from "express";
import { IUserRequest } from "../interfaces/user";
import User from "../models/user";


export const isAuthenticated = asyncHandler(async (req: IUserRequest, res: Response, next: NextFunction) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET_KEY as string);

      req.user = await User.findById(decoded.id).select("-password");
      
      console.log("User data:", req.user);

      next();
    } catch (error: any) {
      console.log(error.message);
      res.status(401);
      throw new Error("Invalid token");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("No token provided");
  }
});

export const isAdmin = (req: IUserRequest, res: Response, next: NextFunction) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403);
    throw new Error("User is not an admin");
  }
};


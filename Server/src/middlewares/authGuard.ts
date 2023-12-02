import jwt, { JwtPayload } from "jsonwebtoken";
import { Request } from "express";
import asyncHandler from "./asyncHandler";
import USER from "../models/common/User";
import Unauthorized from "../utils/errors/Unauthorized";
import BadRequest from "../utils/errors/BadRequest";
import { UserI } from "../models/common/User";
import { HasRole, Roles } from "../config/constants";
import ErrorResponse from "../utils/errors/ErrorResponse";
import { Document } from "mongoose";
import { Types } from "mongoose";
import { BikerI } from "../models/Biker";
import { SenderI } from "../models/Sender";

export interface AuthenticatedRequest extends Request {
  user: UserI & HasRole;
}

const authGuard = asyncHandler(async (req: Request, _res, next) => {
  let token = req.cookies["token_uid"] || req.body.token;
  if (!token) return next(new Unauthorized("Unauthorized user access"));

  let decodedToken;

  try {
    decodedToken = jwt.verify(
      token,
      process.env.JWT_KEY as string
    ) as JwtPayload;
  } catch (err) {
    next(new BadRequest("invalid token"));
    return;
  }

  const user = (await USER.findById(decodedToken.id)) as UserI & HasRole;
  if (user === null) {
    return next(new Unauthorized("Unauthorized user access"));
  }
  (req as AuthenticatedRequest).user = user;
  next();
});

const authorize =
  (...roles: Roles[]) =>
  (
    req: AuthenticatedRequest,
    _res: never,
    next: (err?: ErrorResponse) => void
  ) => {
    if (roles.includes(req.user.role)) return next();
    next(new ErrorResponse(401, "Unauthorized access"));
  };

export default authGuard;

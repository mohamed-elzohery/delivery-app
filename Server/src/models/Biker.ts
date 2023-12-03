import { Schema, model } from "mongoose";
import { UserI } from "./common/User";
import User from "./common/User";
import bcrypt from "bcryptjs";
import { HasRole, Roles } from "../config/constants";

export interface BikerI extends UserI, HasRole {}

const BikerSchema = new Schema<BikerI>({
  // Additional fields specific to Biker
});

// Combine UserSchema fields with BikerSchema fields
const Biker = User.discriminator("Biker", BikerSchema);

export default Biker;

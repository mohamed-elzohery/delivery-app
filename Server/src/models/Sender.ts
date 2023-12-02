import { Schema } from "mongoose";
import { UserI } from "./common/User";
import User from "./common/User";
import { HasRole } from "../config/constants";

export interface SenderI extends UserI, HasRole {
  // Additional fields specific to Sender
}

const SenderSchema = new Schema<SenderI>({
  // Additional fields specific to Sender
});

// Combine UserSchema fields with SenderSchema fields
const Sender = User.discriminator("Sender", SenderSchema);

export default Sender;

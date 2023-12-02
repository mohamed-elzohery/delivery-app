import { Schema, model } from "mongoose";
import { UserI } from "./common/User";
import User from "./common/User";

export interface BikerI extends UserI {
  // Additional fields specific to Biker
}

const BikerSchema = new Schema<BikerI>({
  // Additional fields specific to Biker
});

// Combine UserSchema fields with BikerSchema fields
const Biker = User.discriminator("Biker", BikerSchema);

export default Biker;

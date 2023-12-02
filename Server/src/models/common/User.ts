import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export interface UserI {
  name: string;
  email: string;
  password: string;
  isPasswordMatched: (password: string) => Promise<boolean>;
  createToken: () => string;
}

const UserSchema = new Schema<UserI>(
  {
    name: {
      type: String,
      required: [true, "name is required."],
      maxlength: [30, "name cannot be more than 30 characters"],
      minlength: [2, "name cannot be less than two characters"],
      match: [
        /^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._ ]+(?<![_.])$/,
        "Invalid Name",
      ],
      trim: true,
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, "email is required"],
      unique: true,
      match: [
        /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
        "Invalid Email",
      ],
    },

    password: {
      type: String,
      required: [true, "password is required."],
      minlength: [8, "password cannot be less than 8 characters"],
      match: [
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "password must be at least one letter, one number and one special character",
      ],
    },
  },
  { discriminatorKey: "role" }
);

// Hash password
UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.password, salt);
  this.password = hash;
  next();
});

UserSchema.methods.isPasswordMatched = async function (
  enteredPassword: string
) {
  return await bcrypt.compare(enteredPassword, this.password);
};

UserSchema.methods.createToken = function () {
  return jwt.sign(
    { id: this._id, email: this.email, role: this.role },
    process.env.JWT_KEY as string,
    {
      expiresIn: +(process.env.JWT_AGE as string) / 1000,
    }
  );
};

const User = model("User", UserSchema);

export default User;

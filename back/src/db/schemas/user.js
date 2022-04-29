import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    nickname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    badge: [{ type: String }],
    level: { type: Number, default: 0 },
    point: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const UserModel = model("User", UserSchema, "users");

export { UserModel };

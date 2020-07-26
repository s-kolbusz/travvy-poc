import { Schema, Document, Model, model } from "mongoose";
import { IRoute } from "./route";

export interface IUser extends Document {
  email: string;
  password: string;
  createdRoutes: IRoute[];
}

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdRoutes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Route",
    },
  ],
});

const UserModel: Model<IUser> = model<IUser>("User", userSchema);

export default UserModel;

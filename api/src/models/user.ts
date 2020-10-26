import { Schema, Document, Model, model } from "mongoose";
import { IRoute } from "./route";
import { ICar } from "./car";

export interface IUser extends Document {
  email: string;
  password: string;
  createdRoutes: IRoute[];
  ownedCars: ICar[];
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
  ownedCars: [
    {
      type: Schema.Types.ObjectId,
      ref: "Car",
    },
  ],
});

const UserModel: Model<IUser> = model<IUser>("User", userSchema);

export default UserModel;

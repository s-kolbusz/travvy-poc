import { Schema, Document, Model, model } from "mongoose";
import { IRoute, AllRoutesPromiseType, findAllRoutesByIds } from "./route";

export interface IUser extends Document {
  email: string;
  password: string;
  createdRoutes: IRoute[];
}

export type UserType = {
  _id: any;
  email: string;
  password: null;
  createdRoutes: AllRoutesPromiseType;
};

export type UserPromiseType = Promise<UserType>;

export const findUserById: (id: string) => UserPromiseType = async (
  id: string
) => {
  const user = await UserModel.findById(id);

  if (!user) throw new Error("User for given Id does not exist!");

  return {
    _id: user.id,
    email: user.email,
    password: null,
    createdRoutes: findAllRoutesByIds(
      user.createdRoutes.map((route) => route._id)
    ),
  };
};

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

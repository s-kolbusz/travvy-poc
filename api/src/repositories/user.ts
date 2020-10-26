import UserModel from "../models/user";
import { AllRoutesPromise, findAllRoutesByIds } from "./route";
import { findAllCarsByIds, AllCarsPromise } from "./car";

export type UserType = {
  _id: any;
  email: string;
  password: null;
  createdRoutes: AllRoutesPromise;
  ownedCars: AllCarsPromise;
};

export type UserPromise = Promise<UserType>;

export const findUserById: (id: string) => UserPromise = async (id: string) => {
  const user = await UserModel.findById(id);

  if (!user) throw new Error("User for given Id does not exist!");

  return {
    _id: user.id,
    email: user.email,
    password: null,
    createdRoutes: findAllRoutesByIds.bind(
      this,
      user.createdRoutes.map((route) => route._id)
    ),
    ownedCars: findAllCarsByIds.bind(
      this,
      user.ownedCars.map((car) => car._id)
    ),
  };
};

import { Schema, Document, model, Model } from "mongoose";
import { IUser, findUserById } from "./user";

export interface IRoute extends Document {
  from: string;
  to: string;
  price: number;
  date: Date;
  places: number;
  creator: IUser;
}
export type RouteType = {
  _id: any;
  from: string;
  to: string;
  price: number;
  date: string;
  places: number;
  creator: any;
};

export type RoutePromiseType = Promise<RouteType>;
export type AllRoutesPromiseType = Promise<RouteType[]>;

const routeValueMapper = (route: IRoute): RouteType => {
  return {
    _id: route.id,
    from: route.from,
    to: route.to,
    price: route.price,
    date: new Date(route.date).toISOString(),
    places: route.places,
    creator: findUserById(route.creator._id),
  };
};

export const findAllRoutes: () => AllRoutesPromiseType = async () => {
  try {
    const routes = await RouteModel.find();
    return routes.map((route) => {
      return routeValueMapper(route);
    });
  } catch (e) {
    throw e;
  }
};

export const findAllRoutesByIds: (
  ids: string[]
) => AllRoutesPromiseType = async (ids: string[]) => {
  try {
    const routes = await RouteModel.find({ _id: { $in: ids } });
    return routes.map((route) => {
      return routeValueMapper(route);
    });
  } catch (e) {
    throw e;
  }
};

export const findRouteById: (id: string) => RoutePromiseType = async (
  id: string
) => {
  try {
    const route = await RouteModel.findById(id);
    if (!route) throw new Error("There is no route for this id!");
    return routeValueMapper(route);
  } catch (e) {
    throw e;
  }
};

const routeSchema: Schema = new Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  price: { type: Number, required: true },
  date: { type: Date, required: true },
  places: { type: Number, required: true },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const RouteModel: Model<IRoute> = model<IRoute>("Route", routeSchema);

export default RouteModel;

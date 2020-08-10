import { Schema, Document, model, Model } from "mongoose";
import { IUser, findUserById, UserPromise } from "./user";
import { IBooking, findAllBookingsByIds, AllBookingsPromise } from "./booking";
import { dateToString } from "../helpers/date";

export interface IRoute extends Document {
  from: string;
  to: string;
  price: number;
  date: Date;
  places: number;
  creator: IUser;
  bookings: IBooking[];
}
export type RouteType = {
  _id: string;
  from: string;
  to: string;
  price: number;
  date: string;
  places: number;
  creator: UserPromise;
  bookings: AllBookingsPromise;
};

export type RoutePromise = Promise<RouteType>;
export type AllRoutesPromise = Promise<RouteType[]>;

const routeValueMapper = (route: IRoute): RouteType => {
  return {
    _id: route.id,
    from: route.from,
    to: route.to,
    price: route.price,
    date: dateToString(route.date),
    places: route.places,
    creator: findUserById.bind(this, route.creator._id),
    bookings: findAllBookingsByIds.bind(
      this,
      route.bookings.map((booking) => booking._id)
    ),
  };
};

export const findAllRoutes: () => AllRoutesPromise = async () => {
  try {
    const routes = await RouteModel.find();
    return routes.map((route) => {
      return routeValueMapper(route);
    });
  } catch (e) {
    throw e;
  }
};

export const findAllRoutesByIds: (ids: string[]) => AllRoutesPromise = async (
  ids: string[]
) => {
  try {
    const routes = await RouteModel.find({ _id: { $in: ids } });
    return routes.map((route) => {
      return routeValueMapper(route);
    });
  } catch (e) {
    throw e;
  }
};

export const findRouteById: (id: string) => RoutePromise = async (
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
  bookings: [
    {
      type: Schema.Types.ObjectId,
      ref: "Booking",
    },
  ],
});

const RouteModel: Model<IRoute> = model<IRoute>("Route", routeSchema);

export default RouteModel;

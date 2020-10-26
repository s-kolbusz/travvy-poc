import RouteModel, { IRoute } from "../models/route";
import { dateToString } from "../helpers/date";
import { findUserById, UserPromise } from "./user";
import { findAllBookingsByIds, AllBookingsPromise } from "./booking";

export type RouteType = {
  _id: string;
  from: string;
  to: string;
  price: number;
  date: string;
  amplitude: number;
  creator: UserPromise;
  bookings: AllBookingsPromise;
};

export type RoutePromise = Promise<RouteType>;
export type AllRoutesPromise = Promise<IRoute[]>;

// const routeValueMapper = (route: IRoute): RouteType => {
//   return {
//     _id: route.id,
//     from: route.from,
//     to: route.to,
//     price: route.price,
//     date: dateToString(route.date),
//     amplitude: route.amplitude,
//     creator: findUserById.bind(this, route.creator._id),
//     bookings: findAllBookingsByIds.bind(
//       this,
//       route.bookings.map((booking) => booking._id)
//     ),
//   };
// };

export const findAllRoutes: () => AllRoutesPromise = async () => {
  try {
    return await RouteModel.find();
    // return routes.map((route) => {
    //   return routeValueMapper(route);
    // });
  } catch (e) {
    throw e;
  }
};

export const findAllRoutesByIds: (ids: string[]) => AllRoutesPromise = async (
  ids: string[]
) => {
  try {
    return await RouteModel.find({ _id: { $in: ids } });
    // return routes.map((route) => {
    //   return routeValueMapper(route);
    // });
  } catch (e) {
    throw e;
  }
};

export const findRouteById: (id: string) => Promise<IRoute> = async (
  id: string
) => {
  try {
    const route = await RouteModel.findById(id);
    if (!route) throw new Error("There is no route for this id!");
    return route;
    // return routeValueMapper(route);
  } catch (e) {
    throw e;
  }
};

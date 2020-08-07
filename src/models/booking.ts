import { Schema, model, Document, Model } from "mongoose";
import { IUser, UserType, findUserById } from "./user";
import { RouteType, IRoute, findRouteById } from "./route";

export interface IBooking extends Document {
  route: IRoute;
  user: IUser;
}

export type BookingType = {
  _id: string;
  route: Promise<RouteType>;
  user: Promise<UserType>;
  createdAt: string;
  updatedAt: string;
};

export type BookingPromiseType = Promise<BookingType>;
export type AllBookingsPromiseType = Promise<BookingType[]>;

const bookingValueMapper = (booking: IBooking): BookingType => {
  const fullBooking: any = { ...booking };

  return {
    _id: booking.id,
    route: findRouteById(booking.route._id),
    user: findUserById(booking.user._id),
    createdAt: new Date(fullBooking._doc.createdAt).toISOString(),
    updatedAt: new Date(fullBooking._doc.updatedAt).toISOString(),
  };
};

export const findAllBookings: () => AllBookingsPromiseType = async () => {
  try {
    const bookings = await BookingModel.find();
    return bookings.map((booking) => {
      return bookingValueMapper(booking);
    });
  } catch (e) {
    throw e;
  }
};

export const findAllRoutesByIds: (
  ids: string[]
) => AllBookingsPromiseType = async (ids: string[]) => {
  try {
    const bookings = await BookingModel.find({ _id: { $in: ids } });
    return bookings.map((booking) => {
      return bookingValueMapper(booking);
    });
  } catch (e) {
    throw e;
  }
};

export const findBookingById: (id: string) => BookingPromiseType = async (
  id: string
) => {
  try {
    const booking = await BookingModel.findById(id);
    if (!booking) throw new Error("There is no booking for this id!");
    return bookingValueMapper(booking);
  } catch (e) {
    throw e;
  }
};

const bookingSchema = new Schema(
  {
    route: {
      type: Schema.Types.ObjectId,
      ref: "Route",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const BookingModel: Model<IBooking> = model<IBooking>("Booking", bookingSchema);
export default BookingModel;

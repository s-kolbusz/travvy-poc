import BookingModel, { IBooking } from "../models/booking";
import { dateToString } from "../helpers/date";
import { findRouteById, RoutePromise } from "./route";
import { findUserById, UserPromise } from "./user";

export type BookingType = {
  _id: string;
  route: RoutePromise;
  user: UserPromise;
  createdAt: string;
  updatedAt: string;
};

export type BookingPromise = Promise<BookingType>;
export type AllBookingsPromise = Promise<BookingType[]>;

const bookingValueMapper = (booking: IBooking): BookingType => {
  const fullBooking: any = { ...booking };

  return {
    _id: booking.id,
    route: findRouteById.bind(this, booking.route._id),
    user: findUserById.bind(this, booking.user._id),
    createdAt: dateToString(fullBooking._doc.createdAt),
    updatedAt: dateToString(fullBooking._doc.updatedAt),
  };
};

export const findAllBookings: () => AllBookingsPromise = async () => {
  try {
    const bookings = await BookingModel.find();
    return bookings.map((booking) => {
      return bookingValueMapper(booking);
    });
  } catch (e) {
    throw e;
  }
};

export const findAllBookingsByIds: (
  ids: string[]
) => AllBookingsPromise = async (ids: string[]) => {
  try {
    const bookings = await BookingModel.find({ _id: { $in: ids } });
    return bookings.map((booking) => {
      return bookingValueMapper(booking);
    });
  } catch (e) {
    throw e;
  }
};

export const findBookingById: (id: string) => BookingPromise = async (
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

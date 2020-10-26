import BookingModel from "../../models/booking";
import UserModel from "../../models/user";
import RouteModel from "../../models/route";
import { findAllBookings, findBookingById } from "../../repositories/booking";

const queries = {
  bookings: async (_: any, __: any, { userId }: { userId: string }) => {
    try {
      return await findAllBookings();
    } catch (e) {
      throw e;
    }
  },
};
const mutations = {
  bookRoute: async (
    _: any,
    { routeId }: { routeId: string },
    { userId, isAuth }: { userId: string; isAuth: boolean }
  ) => {
    try {
      if (!isAuth) throw new Error("Unauthenticated!");
      const user = await UserModel.findById(userId);
      if (!user) {
        throw new Error(`Given user ${userId} does not exist!`);
      }

      const route = await RouteModel.findById(routeId);
      if (!route) {
        throw new Error(`Given route ${routeId} does not exist!`);
      }

      const booking = new BookingModel({
        route,
        user,
      });

      const savedBooking = await booking.save();
      const createdBooking = await findBookingById(savedBooking._id);

      route.bookings.push(booking);
      await route.save();

      return createdBooking;
    } catch (e) {
      throw e;
    }
  },
  cancelBooking: async (
    _: any,
    { bookingId }: { bookingId: string },
    { isAuth }: { isAuth: boolean }
  ) => {
    try {
      if (!isAuth) throw new Error("Unauthenticated!");
      const booking = await findBookingById(bookingId);
      if (!booking) throw new Error(`There is no booking for id ${bookingId}`);
      const route = booking.route;

      await BookingModel.deleteOne({ _id: bookingId });
      return route;
    } catch (e) {
      throw e;
    }
  },
};

const bookingResolver = { queries, mutations };

export default bookingResolver;

import bcrypt from "bcrypt";

import RouteModel, {
  findAllRoutes,
  IRoute,
  findRouteById,
} from "../../models/route";
import UserModel, { IUser } from "../../models/user";
import BookingModel, {
  IBooking,
  findAllBookings,
  findBookingById,
} from "../../models/booking";

const userId = "5f254726019635477ff63800";

const graphqlResolvers = {
  routes: async () => {
    try {
      return await findAllRoutes();
    } catch (e) {
      throw e;
    }
  },
  bookings: async () => {
    try {
      return await findAllBookings();
    } catch (e) {
      throw e;
    }
  },
  createRoute: async ({ routeInput }: { routeInput: IRoute }) => {
    try {
      const route = new RouteModel({
        from: routeInput.from,
        to: routeInput.to,
        price: +routeInput.price,
        date: new Date(routeInput.date).toISOString(),
        places: routeInput.places,
        creator: userId,
      });

      const savedRoute = await route.save();

      const createdRoute = findRouteById(savedRoute._id);

      const user = await UserModel.findById(userId);

      if (!user) {
        throw new Error(`Given user ${userId} does not exist!`);
      }

      user.createdRoutes.push(route);
      await user.save();

      return createdRoute;
    } catch (e) {
      throw e;
    }
  },
  bookRoute: async ({ routeId }: { routeId: string }) => {
    try {
      const user = await UserModel.findById(userId);
      if (!user) {
        throw new Error(`Given user ${userId} does not exist!`);
      }

      const route = await RouteModel.findById(routeId);

      const booking = new BookingModel({
        route,
        user,
      });

      const savedBooking = await booking.save();
      const createdBooking = await findBookingById(savedBooking._id);
      return createdBooking;
    } catch (e) {
      throw e;
    }
  },
  createUser: async ({ userInput }: { userInput: IUser }) => {
    try {
      const user = await UserModel.findOne({ email: userInput.email });
      if (user) {
        throw new Error("User already exists!");
      }

      const hashedPassword = await bcrypt.hash(userInput.password, 12);

      const newUser = new UserModel({
        email: userInput.email,
        password: hashedPassword,
      });

      const result = await newUser.save();

      return { _id: result.id, email: result.email, password: null };
    } catch (e) {
      throw e;
    }
  },
};

export default graphqlResolvers;

import RouteModel, { IRoute } from "../../models/route";
import UserModel from "../../models/user";
import { dateToString } from "../../helpers/date";
import { findAllRoutes, findRouteById } from "../../repositories/route";

const queries = {
  routes: async () => {
    try {
      return await findAllRoutes();
    } catch (e) {
      throw e;
    }
  },
};

const mutations = {
  createRoute: async (
    _: any,
    { routeInput }: { routeInput: IRoute },
    { userId, isAuth }: { userId: string; isAuth: boolean }
  ) => {
    try {
      if (!isAuth) throw new Error("Unauthenticated!");
      const route = new RouteModel({
        from: routeInput.from,
        to: routeInput.to,
        price: +routeInput.price,
        date: dateToString(routeInput.date),
        amplitude: routeInput.amplitude,
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
};

const routesResolver = { queries, mutations };

export default routesResolver;

import userResolver from "./user";
import routesResolver from "./routes";
import bookingResolver from "./booking";

export const userId = "5f2eae1b21679d16955f95c7";

const resolvers = {
  Query: {
    ...routesResolver.queries,
    ...bookingResolver.queries,
  },
  Mutation: {
    ...userResolver.mutations,
    ...routesResolver.mutations,
    ...bookingResolver.mutations,
  },
};

export default resolvers;

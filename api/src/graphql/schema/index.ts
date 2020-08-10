import { gql } from "apollo-server-express";

import user from "./types/user";
import route from "./types/route";
import booking from "./types/booking";

const typeDefs = gql`
  ${user}
  ${route}
  ${booking}

  type Query {
    routes: [Route!]!
    bookings: [Booking!]!
    login(email: String!, password: String!): AuthData!
  }

  type Mutation {
    createRoute(routeInput: RouteInput): Route
    createUser(userInput: UserInput): User
    bookRoute(routeId: ID!): Booking!
    cancelBooking(bookingId: ID!): Route!
  }
`;

export default typeDefs;

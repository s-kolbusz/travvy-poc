import { buildSchema } from "graphql";

const graphqlSchema = buildSchema(`
type Booking {
  _id: ID!
  route: Route!
  user: User!
  createdAt: String!
  updatedAt: String!
}

type Route {
  _id: ID!
  from: String!
  to: String!
  price: Float!
  date: String!
  places: Int!
  creator: User!
  bookings: [Booking!]!
}

type User {
  _id: ID!
  email: String!
  password: String
  createdRoutes: [Route!]!
}

input RouteInput {
  from: String!
  to: String!
  price: Float!
  date: String!
  places: Int!
}

input UserInput {
  email: String!
  password: String!
}

type RootQuery {
  routes: [Route!]!
  bookings: [Booking!]!
}

type RootMutation {
  createRoute(routeInput: RouteInput): Route
  createUser(userInput: UserInput): User
  bookRoute(routeId: ID!): Booking!
  cancelBooking(bookingId: ID!): Route!
}

schema {
  query: RootQuery
  mutation: RootMutation
}
`);

export default graphqlSchema;

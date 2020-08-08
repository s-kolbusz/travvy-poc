import { gql } from "apollo-server-express";

export default gql`
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

  input RouteInput {
    from: String!
    to: String!
    price: Float!
    date: String!
    places: Int!
  }
`;

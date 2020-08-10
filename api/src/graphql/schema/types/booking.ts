import { gql } from "apollo-server-express";

export default gql`
  type Booking {
    _id: ID!
    route: Route!
    user: User!
    createdAt: String!
    updatedAt: String!
  }
`;

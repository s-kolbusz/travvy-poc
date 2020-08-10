import { gql } from "apollo-server-express";

export default gql`
  type User {
    _id: ID!
    email: String!
    password: String
    createdRoutes: [Route!]!
  }

  input UserInput {
    email: String!
    password: String!
  }

  type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
  }
`;

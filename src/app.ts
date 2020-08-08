import express from "express";
import { ApolloServer } from "apollo-server-express";
import mongoose from "mongoose";

import typeDefs from "./graphql/schema";
import resolvers from "./graphql/resolvers";

const appPort = 3000;
const app = express();

const graphqlServer = new ApolloServer({ typeDefs, resolvers });
graphqlServer.applyMiddleware({ app });

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@travvy.r3udf.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
  )
  .then(() =>
    app.listen({ port: appPort }, () =>
      console.log(
        `🚀 Server ready at http://localhost:${appPort}${graphqlServer.graphqlPath}`
      )
    )
  )
  .catch((err) => console.error(err));

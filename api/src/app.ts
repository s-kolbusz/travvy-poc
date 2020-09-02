import express from "express";
import { ApolloServer } from "apollo-server-express";
import mongoose from "mongoose";

import isAuth, { IsAuthRequest } from "./middleware/is-auth";

import typeDefs from "./graphql/schema";
import resolvers from "./graphql/resolvers";

const appPort = 3000;
const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  return next();
});

app.use(isAuth);

const graphqlServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }: { req: IsAuthRequest }) => {
    // console.log(req);
    // if (!req.isAuth) throw new AuthenticationError("You must be logged in!");

    return { userId: req.userId };
  },
});
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

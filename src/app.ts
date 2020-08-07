import express from "express";
import bodyParser from "body-parser";
import { graphqlHTTP } from "express-graphql";
import mongoose from "mongoose";

import graphqlSchema from "./graphql/schema";
import graphqlResolvers from "./graphql/resolvers";

const appPort = 3000;

const app = express();
app.use(bodyParser.json());
app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true,
  })
);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@travvy.r3udf.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
  )
  .then(() => app.listen(appPort))
  .catch((err) => console.error(err));

console.log("App is up and runing on http://localhost:" + appPort);

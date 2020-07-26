import express from "express";
import bodyParser from "body-parser";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

import Route, { IRoute } from "./models/route";
import User, { IUser } from "./models/user";

const appPort = 3000;

const schema = buildSchema(`
type Route {
  _id: ID!
  from: String!
  to: String!
  price: Float!
  date: String!
  places: Int!
}

type User {
  _id: ID!
  email: String!
  password: String
  createdRoutes: [String!]!
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
  users: [User!]!
}

type RootMutation {
  createRoute(routeInput: RouteInput): Route
  createUser(userInput: UserInput): User
}

schema {
  query: RootQuery
  mutation: RootMutation
}
`);

const userId = "5f1d6e6d3ec0e829c3afc8fa";

const rootValue = {
  routes: async () => {
    return await Route.find()
      .then((res) => res)
      .catch((err) => {
        throw err;
      });
  },
  users: async () => {
    return await User.find()
      .then((result) => {
        return result.map((user) => {
          return {
            _id: user.id,
            email: user.email,
            password: null,
            createdRoutes: user.createdRoutes,
          };
        });
      })
      .catch((err) => {
        throw err;
      });
  },
  createRoute: async ({ routeInput }: { routeInput: IRoute }) => {
    const route = new Route({
      from: routeInput.from,
      to: routeInput.to,
      price: +routeInput.price,
      date: new Date(routeInput.date),
      places: routeInput.places,
      creator: userId,
    });

    let createdRoute: IRoute;
    return await route
      .save()
      .then((res) => {
        createdRoute = res;
        return User.findById(userId);
      })
      .then((user) => {
        if (!user) {
          throw new Error(`Given user ${userId} does not exist!`);
        }
        user.createdRoutes.push(route);
        return user.save();
      })
      .then((_) => createdRoute)
      .catch((err) => {
        throw err;
      });
  },
  createUser: async ({ userInput }: { userInput: IUser }) => {
    return await User.findOne({ email: userInput.email })
      .then((user) => {
        if (user) {
          throw new Error("User already exists!");
        }
        return bcrypt.hash(userInput.password, 12);
      })
      .then((hashedPassword) => {
        const user = new User({
          email: userInput.email,
          password: hashedPassword,
        });
        return user.save();
      })
      .then((result) => {
        return { _id: result.id, email: result.email, password: null };
      })
      .catch((err) => {
        throw err;
      });
  },
};

const app = express();
app.use(bodyParser.json());
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue,
    graphiql: true,
  })
);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@travvy.r3udf.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => app.listen(appPort))
  .catch((err) => console.error(err));

console.log("App is up and runing on http://localhost:" + appPort);

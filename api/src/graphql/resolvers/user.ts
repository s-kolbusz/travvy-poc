import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";

import UserModel, { IUser } from "../../models/user";

const queries = {
  login: async (
    _: any,
    { email, password }: { email: string; password: string }
  ) => {
    try {
      const user = await UserModel.findOne({ email });
      if (!user) throw new Error(`User "${email}" does not exist!`);

      const isCorrectPassword = await bcrypt.compare(password, user.password);
      if (!isCorrectPassword) throw new Error("Given password is incorrect!");

      const token = sign(
        { userId: user._id, email: user.email },
        "passwordToken",
        {
          expiresIn: "1h",
        }
      );

      return { userId: user._id, token, tokenExpiration: 1 };
    } catch (e) {
      throw e;
    }
  },
};

const mutations = {
  createUser: async (_: any, { userInput }: { userInput: IUser }) => {
    try {
      const user = await UserModel.findOne({ email: userInput.email });

      if (user) throw new Error("User already exists!");

      const hashedPassword = await bcrypt.hash(userInput.password, 12);

      const newUser = new UserModel({
        email: userInput.email,
        password: hashedPassword,
      });

      const result = await newUser.save();

      return { _id: result.id, email: result.email, password: null };
    } catch (e) {
      throw e;
    }
  },
};

const userResolver = { queries, mutations };

export default userResolver;

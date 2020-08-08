import bcrypt from "bcrypt";

import UserModel, { IUser } from "../../models/user";

const mutations = {
  createUser: async ({}, { userInput }: { userInput: IUser }) => {
    try {
      const user = await UserModel.findOne({ email: userInput.email });

      if (user) {
        throw new Error("User already exists!");
      }

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

const userResolver = { mutations };

export default userResolver;

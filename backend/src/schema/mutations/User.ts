import { GraphQLID, GraphQLString } from "graphql";
import { UserType } from "../typedefs/User";
import { MessageType } from "../typedefs/Message";
import { Users } from "../../entities/Users";

export const CREATE_USER = {
  type: UserType,
  args: {
    name: { type: GraphQLString },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(parent: any, args: any) {
    const { name, username, password } = args;
    await Users.insert({ name, username, password });
    return args;
  },
};

export const UPDATE_PASSWORD = {
  type: MessageType,
  args: {
    username: { type: GraphQLString },
    oldPassword: { type: GraphQLString },
    newPassword: { type: GraphQLString },
  },
  async resolve(parent: any, args: any) {
    const { username, oldPassword, newPassword } = args;
    const user = await Users.findOne({ username });
    if (!user) {
      throw new Error("Username does not exist");
    }
    const userPassword = user?.password;
    if (oldPassword === userPassword) {
      await Users.update({ username }, { password: newPassword });
      return { successfull: true, message: "Password updated" };
    } else {
      throw new Error("Password do not match!");
    }
  },
};
export const DELETE_USER = {
  type: MessageType,
  args: {
    id: { type: GraphQLID },
  },
  async resolve(parent: any, args: any) {
    const { id } = args;
    Users.delete(id);
    return { successfull: true, message: "Delete worked" };
  },
};

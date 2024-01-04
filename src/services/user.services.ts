import { Request, Response } from "express";
import HttpStatusCodes from "../constants/HttpStatusCodes";
import { generateError } from "../libs/handlers/errorsHandlers";
import { UserInput } from "../constants/data";
import { User } from "../models/Users";
import bcrypt from "bcrypt";
import bcryptModule from "../util/bcryptModule";
class userServices {
  public async createNewUser(input: UserInput) {
    const pwd = await bcryptModule.getHash(input.password);

    const userExisting = await User.findOne({ email: input.email });
    if (userExisting) {
      throw generateError("User already exist!", HttpStatusCodes.CONFLICT);
    }
    const new_user = await User.create({
      email: input.email,
      password: pwd,
      username: input.username,
    });
    return new_user;
  }
  // register
  public async registerUser(input: UserInput) {
    // check if user exist
    const userExisting = await User.findOne({ email: input.email });
    if (userExisting) {
      throw generateError("User already exist!", HttpStatusCodes.CONFLICT);
    }
    // check password matching
    if (input.password !== input.confirmPassword) {
      throw generateError(
        "Password is not matching!",
        HttpStatusCodes.CONFLICT
      );
    }
    const pwd = await bcryptModule.getHash(input.password);
    const new_user = await User.create({
      email: input.email,
      password: pwd,
      username: input.username,
      avatar: input.avatar,
    });
    return new_user;
  }
}

export default new userServices();

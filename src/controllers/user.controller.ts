import { NextFunction, Request, Response } from "express";
import {
  sendSuccessResponse,
  sendSuccessResponseBoolean,
  sendSuccessResponseCanNull,
  sendSuccessResponseString,
} from "../constants/successResponse";

import HttpStatusCodes from "../constants/HttpStatusCodes";
import userServices from "../services/user.services";
import CustomError, { generateError } from "../libs/handlers/errorsHandlers";
import { UsersSchemaValidate } from "../models/Validation/validation";

const userController = {
  createUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { input } = req.body;
      if (!input) {
        throw generateError("Input is invalid", HttpStatusCodes.BAD_REQUEST);
      }
      //validating the request
      const { error, value } = UsersSchemaValidate.validate(input);
      if (error) {
        throw generateError(`Error : ${error}`, HttpStatusCodes.BAD_REQUEST);
      } else {
        const user = await userServices.createNewUser(value);
        if (user) return sendSuccessResponse(res, user);
      }
    } catch (error) {
      console.log(error);
      if (error instanceof CustomError) {
        next(error);
      } else if (error instanceof Error) {
        next(error.message);
      } else {
        next(error);
      }
    }
  },
  registerUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { input } = req.body;
      if (!input) {
        throw generateError("Input is invalid", HttpStatusCodes.BAD_REQUEST);
      }
      //validating the request
      const { error, value } = UsersSchemaValidate.validate(input);
      if (error) {
        throw generateError(`${error}`, HttpStatusCodes.BAD_REQUEST);
      } else {
        const user = await userServices.registerUser(value);
        if (user) return sendSuccessResponse(res, user);
      }
    } catch (error) {
      console.log(error);
      if (error instanceof CustomError) {
        next(error);
      } else if (error instanceof Error) {
        next(error.message);
      } else {
        next(error);
      }
    }
  },
  listUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await userServices.listUser();
      return sendSuccessResponse(res, user);
    } catch (error) {
      console.log(error);
      if (error instanceof CustomError) {
        next(error);
      } else if (error instanceof Error) {
        next(error.message);
      } else {
        next(error);
      }
    }
  },
};
export default userController;

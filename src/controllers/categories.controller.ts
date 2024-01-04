import { NextFunction, Request, Response } from "express";
import {
  sendSuccessResponse,
  sendSuccessResponseBoolean,
  sendSuccessResponseCanNull,
  sendSuccessResponseString,
  sendSuccessResponseOnly,
} from "../constants/successResponse";

import HttpStatusCodes from "../constants/HttpStatusCodes";
import userServices from "../services/user.services";
import CustomError, { generateError } from "../libs/handlers/errorsHandlers";
import {
  CategoriesSchemaValidate,
  UsersSchemaValidate,
} from "../models/Validation/validation";
import categoriesServices from "../services/categories.services";

const userController = {
  createCategory: async (req: Request, res: Response, next: NextFunction) => {
    try {
   const  { input }  = req.body
      if (!input) {
        throw generateError("Input is invalid", HttpStatusCodes.BAD_REQUEST);
      }
      //validating the request
      const { error, value } = CategoriesSchemaValidate.validate(input);
      if (error) {
        throw generateError(`Error :  ${error}`, HttpStatusCodes.BAD_REQUEST);
      } else {
        const category = await categoriesServices.createNewCategory(value);
        if (category) return sendSuccessResponse(res, category);
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

  deleteCategory: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { input } = req.body;
      if (!input) {
        throw generateError("Input is invalid", HttpStatusCodes.BAD_REQUEST);
      }
   
        await categoriesServices.deleteCategory(input);
        return sendSuccessResponseOnly(res);
    
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


  deleteCategoryByIDD: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { input } = req.body;
      if (!input) {
        throw generateError("Input is invalid", HttpStatusCodes.BAD_REQUEST);
      }
   
        await categoriesServices.deleteCategoryByID(input);
        return sendSuccessResponseOnly(res);
    
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

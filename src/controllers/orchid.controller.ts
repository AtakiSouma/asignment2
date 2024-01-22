import { NextFunction, Request, Response } from "express";
import CustomError, { generateError } from "../libs/handlers/errorsHandlers";
import HttpStatusCodes from "../constants/HttpStatusCodes";
import categoriesServices from "../services/categories.services";
import {
  sendSuccessResponse,
  sendSuccessResponseBoolean,
  sendSuccessResponseWithStatusCode,
} from "../constants/successResponse";
import orchidsServices from "../services/orchids.services";
const OrchidsController = {
    importOrchids: async (req: Request, res: Response, next: NextFunction) => {
        try {
          const orchids = await orchidsServices.importOrchids();
          return sendSuccessResponse(res, HttpStatusCodes.OK, orchids);
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
  
  
  
  
  
  
  
  
  
  
    createOrchids: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        name,
        slug,
        image,
        background,
        nation,
        release_date,
        revenue,
        rating,
        development,
        category,
      } = req.body;
      if (
        !name ||
        !image ||
        !background ||
        !nation ||
        !release_date ||
        !revenue ||
        !rating ||
        !development ||
        !category
      ) {
        throw generateError("Invalid input data", HttpStatusCodes.BAD_REQUEST);
      }
      const newOrchids = await orchidsServices.createNewOrchid({
        name,
        slug,
        image,
        background,
        release_date,
        category,
        nation,
        revenue,
        rating,
        development,
      });
      return sendSuccessResponse(res, HttpStatusCodes.OK, newOrchids);
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

  updateOrchids: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const slug = req.params.slug;
      if(!slug){
        throw generateError("Orchid is required", HttpStatusCodes.NOT_FOUND)
      }
      const {
        name,
        image,
        background,
        nation,
        release_date,
        revenue,
        rating,
        development,
        category,
      } = req.body;

      const newOrchids = await orchidsServices.updateOrchidBySlug({
        name,
        slug,
        image,
        background,
        release_date,
        category,
        nation,
        revenue,
        rating,
        development,
      });
      return sendSuccessResponse(res, HttpStatusCodes.OK, newOrchids);
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

  getAllOrchids: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newOrchids = await orchidsServices.getAllOrchid();
      return sendSuccessResponse(res, HttpStatusCodes.OK, newOrchids);
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

  getOneOrchids: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const  slug  = req.params.slug;
      const newOrchids = await orchidsServices.getOneOrchid({slug});
      return sendSuccessResponse(res, HttpStatusCodes.OK, newOrchids);
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

  deleteOrchid: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const  slug  = req.params.slug;
      await orchidsServices.DeleteOneOrchid({slug})
      return sendSuccessResponseWithStatusCode(res, HttpStatusCodes.OK);
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

export default OrchidsController;

import { NextFunction, Request, Response } from "express";
import {
  sendSuccessResponse,
  sendSuccessResponseBoolean,
  sendSuccessResponseCanNull,
  sendSuccessResponseString,
  sendSuccessResponseWithStatusCode,
} from "../constants/successResponse";

import HttpStatusCodes from "../constants/HttpStatusCodes";
import userServices from "../services/user.services";
import CustomError, { generateError } from "../libs/handlers/errorsHandlers";
import { MoviesSchemaValidate } from "../models/Validation/validation";
import { Movie } from "../models/Movies";
import movieServices from "../services/movie.services";

//  ----------------------------------------------------------------
// *****  Example Functions Outline *****

// getAllMovie: async (req: Request, res: Response, next: NextFunction) => {
//   try {
//   } catch (error) {
//     console.log(error);
//     if (error instanceof CustomError) {
//       next(error);
//     } else if (error instanceof Error) {
//       next(error.message);
//     } else {
//       next(error);
//     }
//   }
// },

//  ----------------------------------------------------------------

const movieController = {
  // create movie
  // METHOD POST
  // api/movie/create
  createMovie: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { input } = req.body;
      //validating the request
      const { error, value } = MoviesSchemaValidate.validate(input);
      if (error) {
        // throw generateError(`${error}`, HttpStatusCodes.BAD_REQUEST);
        if (error.name === "ValidationError") {
          const validationError = new CustomError(`Validation Error: ${error.message}`, HttpStatusCodes.BAD_REQUEST);
          next(validationError);
        } else {
          throw generateError(`Error: ${error}`, HttpStatusCodes.BAD_REQUEST);
        }
      } else {
        const movie = await movieServices.createNewMovie(value);
        if (movie) return sendSuccessResponse(res, movie);
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

  // get all  movie
  // METHOD GET
  // api/movie/
  getAllMovies: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const allMovie = await movieServices.getAllMovies();
      return sendSuccessResponse(res, allMovie);
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

  //get a single movie
  // METHOD GET
  // api/movie/{id}
  getASingleMovieById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { input } = req.body;
      if(!input){
        throw generateError("Input is invalid" , HttpStatusCodes.NOT_FOUND);
      }
      const singleMovie = await movieServices.getASingleMovieById(input);
      return sendSuccessResponse(res, singleMovie);
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

   //get a single movie
  // METHOD GET
  // api/movie/{slug}
  getASingleMovieBySlug: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { input } = req.body;
      if(!input){
        throw generateError("Input is invalid" , HttpStatusCodes.NOT_FOUND);
      }
      const singleMovie = await movieServices.getMovieBySlug(input);
      return sendSuccessResponse(res, singleMovie);
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

  // update a  movie
  // METHOD PUT
  // api/movie/
  updateMovie: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { input } = req.body;
      if(!input){
        throw generateError("Input is invalid" , HttpStatusCodes.NOT_FOUND);
      }
      const updateMovie = await movieServices.updateMovie(input);
      return sendSuccessResponse(res, updateMovie);
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

  // delete movie
  // METHOD DELETE
  // api/movie/***
  deleteMovie: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { input } = req.body;
      if(!input){
        throw generateError("Input is invalid" , HttpStatusCodes.NOT_FOUND);
      }
      const updateMovie = await movieServices.deleteMovie(input);
      return sendSuccessResponseWithStatusCode(res, updateMovie);
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
  // delete movie by status
  // METHOD PUT
  // api/movie/update-status
  updateStatusMovie: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { input } = req.body;
      if(!input){
        throw generateError("Input is invalid" , HttpStatusCodes.NOT_FOUND);
      }
      const updateMovie = await movieServices.updateStatusMovie(input);
      return sendSuccessResponseBoolean(res, updateMovie);
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
export default movieController;

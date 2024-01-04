import { NextFunction, Request, Response } from 'express';
import authServices from '../services/auth.services';
import { sendSuccessResponse } from '../constants/successResponse';
import CustomError, { generateError } from '../libs/handlers/errorsHandlers';
import HttpStatusCodes from '../constants/HttpStatusCodes';

const authController = {
  resetToken: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = res.locals.payload;
      console.log(payload);

      const user = await authServices.newToken(payload.id, res);
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
  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { input } = req.body;
      if (!input) {
        throw generateError('Input is invalid', HttpStatusCodes.BAD_REQUEST);
      }
      const user = await authServices.login(input, res);

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

  logout: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await authServices.logout(res);

      return sendSuccessResponse(res, { user });
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
  // loginWithGoogle: async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const { idToken } = req.body;
  //     if (!idToken) {
  //       throw generateError('IdToken is invalid', HttpStatusCodes.BAD_REQUEST);
  //     }
  //     const user = await authServices.loginWithGoogle(idToken, res);

  //     return sendSuccessResponse(res, user);
  //   } catch (error) {
  //     console.log(error);

  //     if (error instanceof Error) {
  //       next(error.message);
  //     } else {
  //       next(error);
  //     }
  //   }
  // },
};

export default authController;

import { Response } from "express";
import HttpStatusCodes from "./HttpStatusCodes";

export const sendSuccessResponse = (res: Response, data: object | null) => {
  return res.status(200).json({ success: true, data });
};

export const sendSuccessResponseWithStatusCode = (res: Response, data: HttpStatusCodes) => {
  return res.status(200).json({ success: true, data });
};
export const sendSuccessResponseBoolean = (
  res: Response,
  data: boolean | null
) => {
  return res.status(200).json({ success: true, data });
};
export const sendSuccessResponseString = (
  res: Response,
  data: string | null
) => {
  return res.status(200).json({ success: true, data });
};
export const sendSuccessResponseCanNull = (
  res: Response,
  data: object | null
) => {
  return res.status(200).json({ success: true, data });
};

export const sendSuccessResponseOnly = (res: Response) => {
  return res.status(200).json({ success: true });
};

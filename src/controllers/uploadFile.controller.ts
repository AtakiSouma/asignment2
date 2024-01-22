import express from "express";
import multer from "multer";
import { NextFunction, Request, Response } from "express";
import CustomError, { generateError } from "../libs/handlers/errorsHandlers";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import storage from "../firebase/firebaseStorage";
import { sendSuccessResponse } from "../constants/successResponse";
import { HttpStatusCode } from "axios";
import HttpStatusCodes from "../constants/HttpStatusCodes";

const uploadController = {
  uploadFile: async (req: Request, res: Response, next: NextFunction) => {
    try {
      // get file from request
      const file = req.file;
      if (file) {
        const fileName = `${uuidv4()}${path.extname(file.originalname)}`;
        const blob = storage.file(fileName);
        const blobStream = blob.createWriteStream({
          resumable: false,
          metadata: {
            contentType: file.mimetype,
          },
        });
        //if error
        blobStream.on("error", (error) => {
          res.status(400).json({
            message: error.message,
          });
        });
        // if success
        blobStream.on("finish", () => {
          // get public URL
          const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${storage.name}/o/${fileName}?alt=media`;
          //   res.status(200).json({ fileName, fileUrl: publicUrl });
          return sendSuccessResponse(res, HttpStatusCodes.OK, {
            fileName,
            fileUrl: publicUrl,
          });
        });
        blobStream.end(file.buffer);
      } else {
        res.status(400).json({
          message: "Please upload a file",
        });
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
  uploadMultipleFiles: async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const files = req.files as Express.Multer.File[];

        if (files && files.length > 0) {
            const uploadedFiles: { fileName: string; fileUrl: string }[] = [];

            for (const file of files) {
                const fileName = `${uuidv4()}${path.extname(file.originalname)}`;
                const blob = storage.file(fileName);
                const blobStream = blob.createWriteStream({
                    resumable: false,
                    metadata: {
                        contentType: file.mimetype,
                    },
                });

                let errorHandled = false;

                blobStream.on("error", (error) => {
                    if (!errorHandled) {
                        errorHandled = true;
                        res.status(400).json({
                            message: error.message,
                        });
                    }
                });

                await new Promise<void>((resolve) => {
                    blobStream.on("finish", () => {
                        if (!errorHandled) {
                            const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${storage.name}/o/${fileName}?alt=media`;
                            const result = { fileName, fileUrl: publicUrl };
                            uploadedFiles.push(result);
                            resolve(undefined);
                        }
                    });

                    blobStream.end(file.buffer);
                });
            }

            sendSuccessResponse(res, HttpStatusCodes.OK, uploadedFiles);
        } else {
            res.status(400).json({
                message: "Please upload at least one file",
            });
        }
    } catch (error) {
        console.error(error);
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
export default uploadController;

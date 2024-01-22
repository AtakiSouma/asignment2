import express, { Request, Response, Application } from "express";
import multer from "multer";
import uploadController from "../../controllers/uploadFile.controller";
const router = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
});
router.post("/", upload.single("file"), uploadController.uploadFile);
router.post("/multiple", upload.array("file",5), uploadController.uploadMultipleFiles);
export default router;

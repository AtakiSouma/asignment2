import express, { Request, Response, Application } from 'express';
import userController from '../../controllers/user.controller';
const router = express.Router();

router.post("/list");
router.post("/create", userController.createUser);
router.post("/register" , userController.registerUser);
export default router;
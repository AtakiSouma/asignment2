import express, { Request, Response, Application } from 'express';
import categoriesController from '../../controllers/categories.controller';
const router = express.Router();

router.post("/list");
router.post("/create", categoriesController.createCategory);
router.delete("/delete" , categoriesController.deleteCategory);
router.delete("/",categoriesController.deleteCategoryByIDD);

export default router;
import express, { Request, Response, Application } from "express";
import CategoriesController from "../../controllers/categories.controller";
const router = express.Router();

router.post("/", CategoriesController.createCategory);
router.get("/:slug", CategoriesController.getOneCategoryBysLug);
router.get("/", CategoriesController.allCategories);
router.put("/:slug", CategoriesController.updateCategoryBySlug);
router.delete("/:slug", CategoriesController.deleteCategoriesSlug);

export default router;

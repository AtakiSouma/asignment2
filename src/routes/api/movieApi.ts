import express, { Request, Response, Application } from "express";
import movieController from "../../controllers/movie.controller";
import middlewareController from "../../middlewares/verifyToken.middlewares";
const router = express.Router();

// router.post("/create",middlewareController.verifyToken, middlewareController.requestRefresh, movieController.createMovie);
// router.get("/" , middlewareController.requestRefresh,middlewareController.verifyToken ,movieController.getAllMovies);
// router.post("/single-id", middlewareController.verifyToken, middlewareController.requestRefresh, movieController.getASingleMovieById);
// router.post("/single-slug" , middlewareController.verifyToken, middlewareController.requestRefresh, movieController.getASingleMovieBySlug);
// router.put("/" , middlewareController.requestRefresh,middlewareController.verifyToken , movieController.updateMovie);
// router.put("/status" , middlewareController.requestRefresh, middlewareController.verifyToken , movieController.updateStatusMovie);
// router.delete("/" , middlewareController.requestRefresh , middlewareController.verifyToken , movieController.deleteMovie);

/// not authencated
router.post("/create", movieController.createMovie);
router.get("/", movieController.getAllMovies);
router.post("/single-id", movieController.getASingleMovieById);
router.post("/single-slug", movieController.getASingleMovieBySlug);
router.put("/", movieController.updateMovie);
router.put("/status", movieController.updateStatusMovie);
router.delete("/", movieController.deleteMovie);

export default router;

import express, { Request, Response, Application } from "express";
import OrchidsController from "../../controllers/orchid.controller";
const router = express.Router();
router.post("/import", OrchidsController.importOrchids)
router.post("/", OrchidsController.createOrchids);
router.get("/:slug", OrchidsController.getOneOrchids);
router.post("/getAll", OrchidsController.getAllOrchids);
router.put("/:slug", OrchidsController.updateOrchids);
router.delete("/:slug", OrchidsController.deleteOrchid);

export default router;

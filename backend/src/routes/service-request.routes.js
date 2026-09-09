import { Router } from "express";
import validate from "../middleware/validate.middleware.js";
import {
  createServiceRequestController,
  listServiceRequestsController,
  updateWorkflowStateController,
  addWorkflowNoteController,
  getServiceRequestContextController,
} from "../controllers/service-request.controller.js";
import {
  createServiceRequestValidation,
  updateWorkflowStateValidation,
  addWorkflowNoteValidation,
} from "../validations/service-request.validation.js";

const serviceRequestRouter = Router();

serviceRequestRouter.post(
  "/",
  createServiceRequestValidation,
  validate,
  createServiceRequestController,
);
serviceRequestRouter.get("/", listServiceRequestsController);
serviceRequestRouter.patch(
  "/:id/workflow",
  updateWorkflowStateValidation,
  validate,
  updateWorkflowStateController,
);
serviceRequestRouter.post(
  "/:id/notes",
  addWorkflowNoteValidation,
  validate,
  addWorkflowNoteController,
);
serviceRequestRouter.get("/:id/context", getServiceRequestContextController);

export default serviceRequestRouter;

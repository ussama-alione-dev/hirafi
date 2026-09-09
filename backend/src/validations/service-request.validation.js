import { body } from "express-validator";

const workflowStates = [
  "intake",
  "planning",
  "implementation",
  "validation",
  "done",
];

export const createServiceRequestValidation = [
  body("clientName").trim().notEmpty().withMessage("clientName is required"),
  body("projectTitle")
    .trim()
    .notEmpty()
    .withMessage("projectTitle is required"),
  body("requirements")
    .trim()
    .notEmpty()
    .withMessage("requirements are required"),
  body("workflowState")
    .optional()
    .isIn(workflowStates)
    .withMessage("Invalid workflowState"),
];

export const updateWorkflowStateValidation = [
  body("workflowState")
    .notEmpty()
    .withMessage("workflowState is required")
    .isIn(workflowStates)
    .withMessage("Invalid workflowState"),
];

export const addWorkflowNoteValidation = [
  body("note").trim().notEmpty().withMessage("note is required"),
];

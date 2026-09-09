import { body } from "express-validator";
import ROLES from "../constants/roles.js";

export const registerValidation = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email")
    .isEmail()
    .withMessage("Valid email is required")
    .normalizeEmail(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("role")
    .optional()
    .isIn(Object.values(ROLES))
    .withMessage("Role must be either client or artisan"),
  body("phone").trim().notEmpty().withMessage("Phone is required"),
  body("city").trim().notEmpty().withMessage("City is required"),
  body("specialite")
    .if(body("role").equals(ROLES.ARTISAN))
    .trim()
    .notEmpty()
    .withMessage("specialite is required for artisan"),
  body("description")
    .if(body("role").equals(ROLES.ARTISAN))
    .trim()
    .notEmpty()
    .withMessage("description is required for artisan"),
  body("available")
    .optional()
    .isBoolean()
    .withMessage("available must be a boolean"),
];

export const loginValidation = [
  body("email")
    .isEmail()
    .withMessage("Valid email is required")
    .normalizeEmail(),
  body("password").notEmpty().withMessage("Password is required"),
];

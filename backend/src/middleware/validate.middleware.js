import { validationResult } from "express-validator";

const validate = (req, _res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next({
      statusCode: 400,
      message: "Validation failed",
      errors: errors.array(),
    });
  }

  return next();
};

export default validate;

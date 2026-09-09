import { register, login } from "../services/auth.service.js";

export const registerController = async (req, res, next) => {
  try {
    const result = await register(req.body);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result,
    });
  } catch (error) {
    return next(error);
  }
};

export const loginController = async (req, res, next) => {
  try {
    const result = await login(req.body);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    return next(error);
  }
};

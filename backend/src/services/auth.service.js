import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import ArtisanProfile from "../models/artisan-profile.model.js";
import ROLES from "../constants/roles.js";
import env from "../config/env.js";

const buildToken = (user) => {
  return jwt.sign(
    {
      sub: user._id.toString(),
      role: user.role,
    },
    env.jwtSecret,
    { expiresIn: env.jwtExpiresIn },
  );
};

const safeUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  phone: user.phone,
  city: user.city,
});

export const register = async (payload) => {
  const {
    name,
    email,
    password,
    role = ROLES.CLIENT,
    phone,
    city,
    specialite,
    description,
    available,
  } = payload;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const error = new Error("Email already in use");
    error.statusCode = 409;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
    phone,
    city,
  });

  if (role === ROLES.ARTISAN) {
    await ArtisanProfile.create({
      user: user._id,
      specialite,
      description,
      available: available ?? true,
    });
  }

  const token = buildToken(user);

  return {
    token,
    user: safeUser(user),
  };
};

export const login = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  const token = buildToken(user);

  return {
    token,
    user: safeUser(user),
  };
};

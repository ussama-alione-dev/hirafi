import express from "express";
import app from "./app.js";
import env from "./src/config/env.js";
import { connectDB } from "./src/config/db.js";

const startServer = async () => {
  await connectDB();

  app.listen(env.port, () => {
    console.log(`Server running on port ${env.port}`);
  });
};

startServer();

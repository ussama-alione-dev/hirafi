import express from "express";
import authRouter from "./src/routes/auth.routes.js";
import serviceRequestRouter from "./src/routes/service-request.routes.js";
import notFoundMiddleware from "./src/middleware/not-found.middleware.js";
import errorMiddleware from "./src/middleware/error.middleware.js";

const app = express();

app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    service: "hirafi-backend",
  });
});

app.use("/api/auth", authRouter);
app.use("/api/service-requests", serviceRequestRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;

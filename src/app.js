import express from "express";
import { router as v1 } from "./router/v1";
const app = new express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", v1);

export { app };

import express from "express";
import categoryRouter from "./api/categoryApi";
import orchidsRouter from "./api/orchidApi";
import uploadApi from "./api/uploadApi";
export function route(app: express.Express) {
  app.use("/api/categories", categoryRouter);
  app.use("/api/orchids", orchidsRouter);
  app.use("/api/upload", uploadApi);
}

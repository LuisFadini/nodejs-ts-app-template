import express, { type Express } from "express";

export function createApp(): Express {
  const app = express();

  app.use(express.json());

  app.get("/", (_req, res) => {
    res.status(200).send("Hello world");
  });

  return app;
}

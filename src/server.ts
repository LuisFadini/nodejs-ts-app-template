import type { Server } from "node:http";

import type { Express } from "express";
import type { Logger } from "pino";

export function startServer(
  app: Express,
  port: number,
  logger: Logger,
): Server {
  const server = app.listen(port, () => {
    logger.info(`Server listening on http://localhost:${port}`);
  });

  const shutdown = (signal: string) => {
    logger.info(`${signal} received`);

    server.close(() => {
      logger.info("Server closed");
    });
  };

  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT", () => shutdown("SIGINT"));

  return server;
}

import pino from "pino";

import { type Config, config } from "./config/env.ts";

function createLogger(config: Config) {
  return pino({
    level: config.isDevelopment ? "trace" : "info",
    ...(config.isDevelopment
      ? {
          transport: {
            target: "pino-pretty",
            options: {
              colorize: true,
              ignore: "pid,hostname",
              translateTime: "yyyy-mm-dd HH:MM:ss",
            },
          },
        }
      : {}),
    enabled: !config.isTest,
  });
}

export const logger = createLogger(config);

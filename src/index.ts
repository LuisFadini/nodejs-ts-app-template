import "dotenv/config";

import { createApp } from "./app.ts";
import { config } from "./config/env.ts";
import { logger } from "./logger.ts";
import { startServer } from "./server.ts";

const app = createApp();
startServer(app, config.PORT, logger);

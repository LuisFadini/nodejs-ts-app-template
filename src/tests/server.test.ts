import type { Logger } from "pino";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { createApp } from "../app.ts";
import { startServer } from "../server.ts";

function createMockLogger(): Logger {
  return {
    info: vi.fn(),
    error: vi.fn(),
  } as unknown as Logger;
}

describe("startServer", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("logs when server starts", async () => {
    const app = createApp();
    const logger = createMockLogger();

    const server = startServer(app, 0, logger);

    await new Promise<void>((resolve) => {
      server.on("listening", resolve);
    });

    expect(logger.info).toHaveBeenCalledWith(
      expect.stringContaining("Server listening"),
    );

    server.close();
  });

  it("handles SIGTERM signal", async () => {
    const app = createApp();
    const logger = createMockLogger();

    const server = startServer(app, 0, logger);

    await new Promise<void>((resolve) => {
      server.on("listening", resolve);
    });

    process.emit("SIGTERM");

    expect(logger.info).toHaveBeenCalledWith(
      expect.stringContaining("SIGTERM"),
    );

    server.close();
  });

  it("handles SIGINT signal", async () => {
    const app = createApp();
    const logger = createMockLogger();

    const server = startServer(app, 0, logger);

    await new Promise<void>((resolve) => {
      server.on("listening", resolve);
    });

    process.emit("SIGINT");

    expect(logger.info).toHaveBeenCalledWith(expect.stringContaining("SIGINT"));

    server.close();
  });
});

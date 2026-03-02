import request from "supertest";
import { describe, expect, it } from "vitest";

import { createApp } from "../app.js";

describe("app", () => {
  it("GET / returns Hello world", async () => {
    const app = createApp();

    const response = await request(app).get("/");

    expect(response.status).toBe(200);
    expect(response.text).toBe("Hello world");
  });
});

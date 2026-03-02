import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { loadConfig, NodeEnvironment } from "../../config/env.ts";

const ORIGINAL_ENV = { ...process.env };

describe("config", () => {
  beforeEach(() => {
    process.env = { ...ORIGINAL_ENV };
  });

  afterEach(() => {
    process.env = { ...ORIGINAL_ENV };
  });

  it("defaults NODE_ENV to production when undefined", () => {
    delete process.env.NODE_ENV;
    delete process.env.PORT;

    const config = loadConfig();

    expect(config.NODE_ENV).toBe(NodeEnvironment.Production);
    expect(config.PORT).toBe(3000);
    expect(config.isDevelopment).toBe(false);
    expect(config.isTest).toBe(false);
  });

  it("defaults PORT to 3000 when undefined", () => {
    delete process.env.PORT;

    const config = loadConfig();

    expect(config.PORT).toBe(3000);
  });

  it("sets development correctly", () => {
    process.env.NODE_ENV = "development";
    process.env.PORT = "4000";

    const config = loadConfig();

    expect(config.NODE_ENV).toBe(NodeEnvironment.Development);
    expect(config.PORT).toBe(4000);
    expect(config.isDevelopment).toBe(true);
    expect(config.isTest).toBe(false);
  });

  it("accepts explicit testing value", () => {
    process.env.NODE_ENV = "testing";

    const config = loadConfig();

    expect(config.NODE_ENV).toBe(NodeEnvironment.Testing);
    expect(config.isTest).toBe(true);
  });

  it("maps test alias to testing", () => {
    process.env.NODE_ENV = "test";

    const config = loadConfig();

    expect(config.NODE_ENV).toBe(NodeEnvironment.Testing);
    expect(config.isTest).toBe(true);
  });

  it("accepts staging environment", () => {
    process.env.NODE_ENV = "staging";

    const config = loadConfig();

    expect(config.NODE_ENV).toBe(NodeEnvironment.Staging);
  });

  it("accepts production environment", () => {
    process.env.NODE_ENV = "production";

    const config = loadConfig();

    expect(config.NODE_ENV).toBe(NodeEnvironment.Production);
  });

  it("throws on invalid NODE_ENV", () => {
    process.env.NODE_ENV = "invalid";

    expect(() => loadConfig()).toThrow(/Invalid NODE_ENV/);
  });

  it("throws on invalid PORT (not a number)", () => {
    process.env.PORT = "not-a-number";

    expect(() => loadConfig()).toThrow(/Invalid PORT/);
  });

  it("throws on invalid PORT (out of range)", () => {
    process.env.PORT = "70000";

    expect(() => loadConfig()).toThrow(/Invalid PORT/);
  });

  it("throws on invalid PORT (zero)", () => {
    process.env.PORT = "0";

    expect(() => loadConfig()).toThrow(/Invalid PORT/);
  });
});

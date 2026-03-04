export enum NodeEnvironment {
  Development = "development",
  Testing = "testing",
  Staging = "staging",
  Production = "production",
}

export interface Config {
  NODE_ENV: NodeEnvironment;
  PORT: number;
  isDevelopment: boolean;
  isTest: boolean;
}

function parseNodeEnvironment(value?: string): NodeEnvironment {
  if (!value) return NodeEnvironment.Production;

  const normalized = value.toLowerCase();

  if (Object.values(NodeEnvironment).includes(normalized as NodeEnvironment)) {
    return normalized as NodeEnvironment;
  }
  if (normalized === "test") return NodeEnvironment.Testing;

  throw new Error(
    `Invalid NODE_ENV "${value}". Must be one of: ${Object.values(NodeEnvironment).join(", ")}`,
  );
}

function parsePort(value?: string): number {
  if (!value) return 3000;

  const port = Number(value);

  if (!Number.isInteger(port) || port <= 0 || port > 65_535) {
    throw new Error(
      `Invalid PORT "${value}". Must be an integer between 1 and 65535.`,
    );
  }

  return port;
}

export function loadConfig(): Config {
  const NODE_ENV = parseNodeEnvironment(process.env["NODE_ENV"]);

  return {
    NODE_ENV,
    PORT: parsePort(process.env["PORT"]),
    isDevelopment: NODE_ENV === NodeEnvironment.Development,
    isTest: NODE_ENV === NodeEnvironment.Testing,
  };
}

export const config: Config = loadConfig();

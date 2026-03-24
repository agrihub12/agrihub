type LogLevel = "debug" | "info" | "warn" | "error";

const shouldLogDebug = process.env.NODE_ENV !== "production";

const writeLog = (level: LogLevel, feature: string, message: string, meta?: unknown) => {
  if (level === "debug" && !shouldLogDebug) {
    return;
  }

  const prefix = `[AgriHub][${feature}]`;
  if (meta === undefined) {
    console[level](`${prefix} ${message}`);
    return;
  }

  console[level](`${prefix} ${message}`, meta);
};

export const logger = {
  debug: (feature: string, message: string, meta?: unknown) =>
    writeLog("debug", feature, message, meta),
  info: (feature: string, message: string, meta?: unknown) =>
    writeLog("info", feature, message, meta),
  warn: (feature: string, message: string, meta?: unknown) =>
    writeLog("warn", feature, message, meta),
  error: (feature: string, message: string, meta?: unknown) =>
    writeLog("error", feature, message, meta),
};

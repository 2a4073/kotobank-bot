export type LogLevels = "DEBUG" | "INFO" | "WARN" | "ERROR";

export interface Logger {
    write(message: string, level: LogLevels): void;
}


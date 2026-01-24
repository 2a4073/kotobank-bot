import { LogConsole } from "../services/logger";
import express from "express";

const logger = new LogConsole();

export const startHttpServer = (port: number): void => {
	const app = express();
    app.listen(3000);
    
    app.get("/health", (_req, res) => {
        res.status(200).send("success.");
    });

    app.listen(port, () => {
        logger.write("INFO", `HTTP sever listening on port ${port}.`);
    })
};

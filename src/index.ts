import "dotenv/config";
import { LogConsole } from "./services/logger";
import { startHttpServer } from "./http/server";
import { ClientManager } from "./discord/client";
import { LoadCommand } from "./discord/commandLoader";
import { HandleCommandInteraction } from "./discord/commandHandler";
import { fileURLToPath } from "node:url";
import path from "node:path";

const PORT: number = Number(process.env.PORT) || 3000
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const logger = new LogConsole();

startHttpServer(PORT);

async function main(): Promise<void> {
    logger.write("INFO", `scripts will start...`);
    try {
        const commandLoader = new LoadCommand();
        const commandsDir = path.join(__dirname, "discord/commands/");
        const commands = await commandLoader.load(commandsDir);
        const commandHandler = new HandleCommandInteraction(commands);
        const clientManager = new ClientManager(commandHandler); 

        clientManager.setup();
    } catch (e) {
        if (e instanceof Error) {
           logger.write("ERROR", e.message);
        }
    }
}

main();

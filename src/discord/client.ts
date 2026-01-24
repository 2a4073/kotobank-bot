import { Logger } from "@/services/logger.interface";
import { LogConsole } from "@/services/logger";
import { Client, GatewayIntentBits } from "discord.js";
import { CommandHandler } from "./command.types";

export class ClientManager {
    private logger: Logger = new LogConsole();
    public client = new Client({
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.GuildMembers,
        ]
    });

    constructor (
        private commandHandler: CommandHandler,
    ) {}

    public async setup() {
        this.client.on("interactionCreate", (interaction) => {
            this.commandHandler.handle(interaction);
        });

        this.client.on("clientready", () => {
            if (!this.client.user) return;
            this.logger.write("INFO", `client was started as ${this.client.user.tag}.`);
        });

        this.client.login(process.env.DISCORD_BOT_TOKEN);
    }
}

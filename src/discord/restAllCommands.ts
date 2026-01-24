import { Logger } from "@/services/logger.interface";
import { LogConsole } from "@/services/logger";
import { REST, Routes, RESTPostAPIApplicationCommandsJSONBody } from "discord.js";
import { CommandCollection, CommandRegister } from "./command.types";

export class RegisterGuildAllCommand implements CommandRegister {
    private logger: Logger = new LogConsole();
    private rest: REST;

    constructor(private TOKEN: string, private CLIENT_ID: string, private GUILD_ID: string, private commands: CommandCollection) {
        this.rest = new REST({version: "10"}).setToken(this.TOKEN);
    }

    async register(): Promise<void> {
        try {
            await this.rest.put(
                Routes.applicationGuildCommands(this.CLIENT_ID, this.GUILD_ID),
                { body: this.parseCollection(this.commands) }
            );
        } catch (e) {
            this.logger.write("ERROR", `failed to register commands.`);
        }
    }

    private parseCollection(commands: CommandCollection): RESTPostAPIApplicationCommandsJSONBody[] {
        return commands.map(command => {
            return command.json();
        });
    }
}

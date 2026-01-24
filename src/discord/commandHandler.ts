import { Logger } from "@/services/logger.interface";
import { LogConsole } from "../services/logger";
import { CommandCollection, CommandHandler } from "./command.types";
import { Interaction } from "discord.js";

export class HandleCommandInteraction implements CommandHandler {
    private logger: Logger = new LogConsole();
    constructor (
        private commands: CommandCollection,
    ) {}
    async handle(interaction: Interaction): Promise<void> {
        if (!interaction.isChatInputCommand()) return;

        const command = this.commands.get(interaction.commandName)

        if (!command) {
            this.logger.write("WARN", `command ${interaction.commandName} not found.`);
            return;
        }

        try {
            await command.execute(interaction);
        } catch (e) {
            this.logger.write("ERROR", `failed to execute ${interaction.commandName}.`);

            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({content: "コマンドの実行に失敗しました．", ephemeral: true});
            } else {
                await interaction.reply({content: "コマンドの実行に失敗しました．", ephemeral: true});
            }
        }
    }
}

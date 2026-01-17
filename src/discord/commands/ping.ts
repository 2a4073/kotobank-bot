import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";
import { AbstractCommand } from "./abstractCommand";

export default class Ping extends AbstractCommand {
    data = new SlashCommandBuilder()
        .setName("ping")
        .setDescription("");
    async execute(interaction: ChatInputCommandInteraction) {
        await interaction.reply("Pong!");
    }
}

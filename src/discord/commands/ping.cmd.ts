import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";
import { CommandBase } from "../abstractCommand";

export default class Ping extends CommandBase {
    constructor() { super(); }

    public data = new SlashCommandBuilder()
        .setName("ping")
        .setDescription("aa");

    async execute(interaction: ChatInputCommandInteraction) {
        await interaction.reply("Pong!");
    }
}

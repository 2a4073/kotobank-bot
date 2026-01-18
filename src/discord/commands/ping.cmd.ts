import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";
import { CommandBase } from "../abstractCommand";

export default class Ping extends CommandBase {
    constructor() { super(); }

    public data = new SlashCommandBuilder()
        .setName("ping")
        .setDescription("レイテンシを計測する．");

    async execute(interaction: ChatInputCommandInteraction) {
        console.log(interaction);
        await interaction.reply("Pong!");
    }
}

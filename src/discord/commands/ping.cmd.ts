import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";
import { CommandBase } from "../abstractCommand";

export default class Ping extends CommandBase {
    constructor() { super(); }

    public data = new SlashCommandBuilder()
        .setName("ping")
        .setDescription("レイテンシを計測する．");

    async execute(interaction: ChatInputCommandInteraction) {
        const res = await interaction.reply({
            content: "Pinging...",
            withResponse: true
        });

        const sent = res.resource?.message;
        if (!sent) return;

        const roundtripLatency = sent.createdTimestamp - interaction.createdTimestamp;
        const wsLatency = interaction.client.ws.ping;

        await interaction.editReply({
            content: `## Pong!\n**API Latency**: ${roundtripLatency}ms\n**WS Latency**: ${wsLatency}ms`
        });
    }
}

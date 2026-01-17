import { ChatInputCommandInteraction } from "discord.js";

export type CommandSchema = {
    name: string;
    execute(interaction: ChatInputCommandInteraction): Promise<void>;
}

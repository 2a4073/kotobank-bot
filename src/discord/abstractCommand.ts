import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";

export abstract class CommandBase {
    public abstract data: SlashCommandBuilder;
    abstract execute(interaction: ChatInputCommandInteraction): Promise<void>;

    // restへのput時に使用
    public json() {
        return this.data.toJSON();
    }
}

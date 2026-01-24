import { Collection, SlashCommandBuilder, Interaction } from "discord.js";
import { CommandBase } from "./abstractCommand";

export type CommandCollection = Collection<string, CommandBase>;
export type BuilderCollection = Collection<string, SlashCommandBuilder>;
export interface CommandLoader {
    load(path: string): Promise<CommandCollection>;
}
export interface CommandRegister {
    register(): Promise<void>;
}
export interface CommandHandler {
    handle(interaction: Interaction): Promise<void>;
}

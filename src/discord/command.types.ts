import { Collection } from "discord.js";
import { CommandBase } from "./abstractCommand";

export type CommandCollection = Collection<string, CommandBase>;
export interface CommandLoader {
    load(path: string): Promise<CommandCollection>;
}
export interface CommandRegister {
    register(comands: CommandCollection): Promise<void>;
}

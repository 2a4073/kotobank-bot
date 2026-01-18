import { LogConsole } from "@/services/logger";
import { Collection } from "discord.js";
import { CommandBase } from "./abstractCommand";
import fs from "node:fs";
import path from "node:path";

// コマンドrequire
export class LoadCommand {
    private filePattern = /\.cmd\.(ts|js)$/;
    private logger = new LogConsole();
    public commands = new Collection<string, CommandBase>();
    async load (dir: string): Promise<Collection<string, CommandBase>>{
        const files = await loadDir(dir);
        for (const path of files) {
            if (!this.filePattern.test(path)) {
                continue;
            }
            try {
                const cmdModule = await import(path);
                const cmdClass = cmdModule.default;
                const Command = new cmdClass();

                if (!Command) {
                    this.logger.write("DEBUG", `no class. ${path}`);
                    throw new Error();
                }

                this.commands.set(Command.data.name, Command);

                this.logger.write("INFO", `loaded command file. (${path})`);
            } catch (e) {
                this.logger.write("WARN", `failed to load command file. (${path}), ${e}`);
            }
        }
        return this.commands;
    }
}

// そのうちexportを外すこと
// dirはフルパスを期待する
export async function loadDir(dir: string): Promise<string[]> {
    let filesPath: string[] = [];
    const loadedFiles = fs.readdirSync(dir);

    const dirStats = fs.statSync(dir);
    if (!dirStats.isDirectory()) {
        return filesPath;
    }

    for (const file of loadedFiles) {
        const filePath = path.join(dir, file);
        const stats = await fs.promises.stat(filePath);        

        if (stats.isDirectory()) {
            const childDir = await loadDir(filePath);
            filesPath = filesPath.concat(childDir);
        } else {
            filesPath.push(filePath);
        }
    };
    return filesPath;
}

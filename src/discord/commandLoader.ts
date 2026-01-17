import fs from "node:fs";
import path from "node:path";

// コマンドrequire
export class LoadCommand {
    async load (dir: string) {
        const files = await loadDir(dir);

        files.forEach((path) => {
            // .cmd.ts 及び .cmd.jsのみを扱う点に留意
            if (path.endsWith(".cmd.ts") || path.endsWith(".cmd.js")) {
                const cmdClass = require(path);
            }
        });
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

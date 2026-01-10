import "dotenv/config";
import { fetchKotobank } from "./services/fetchKotobank";
import { parseKotobankHTML } from "./services/parseHTML";
import { startHttpServer } from "./http/server";
import "./discord/client";

const PORT: number = Number(process.env.PORT) || 3000

startHttpServer(PORT);

async function main(): Promise<void> {
    try {
        const HTML = await fetchKotobank("靉");
        const descriptions = new parseKotobankHTML().parse(HTML);

        for (const desc of descriptions) {
            console.log(desc);
        }
    } catch (e) {
        if (e instanceof Error) {
            console.error(e.message);
        }
    }
}

main();

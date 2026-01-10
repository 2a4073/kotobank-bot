import { fetchKotobank } from "./services/fetchKotobank";
import { parseKotobankHTML } from "./services/parseHTML";

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

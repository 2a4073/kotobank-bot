import { fetchKotobank } from "./services/fetchKotobank";

async function main(): Promise<void> {
    try {
        const HTML = await fetchKotobank("うんこ");
        console.log(HTML);
    } catch (e) {
        if (e instanceof Error) {
            console.error(e.message);
        }
    }
}

main();

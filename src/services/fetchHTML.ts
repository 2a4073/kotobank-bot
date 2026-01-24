import { Logger } from "./logger.interface";
import { LogConsole } from "./logger";

interface fetch {
    fetch(url: string): Promise<string>;
}

export class fetchHTML implements fetch {
    private logger: Logger = new LogConsole();
    async fetch(url: string) {
        if (!url) {
            this.logger.write("ERROR", `URL(${url}) was invalid.`);
            throw new Error('URL was invalid.');
        }

        try {
            const res = await globalThis.fetch(url);

            if (!res.ok) {
                this.logger.write("ERROR", `failed fetch "${url}".(${res.status})`);
                throw new Error();
            }

            return await res.text();
        } catch (e) {
            if (e instanceof Error) {
                this.logger.write("ERROR", e.message);
                throw new Error();
            } else {
                this.logger.write("ERROR", `failed to fetch ${url}.`);
                throw new Error();
            }
        }
    }
}

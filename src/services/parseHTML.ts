import { Logger } from "./logger.interface";
import { LogConsole } from "./logger";
import { JSDOM } from "jsdom";

export class parseKotobankHTML {
    private logger: Logger = new LogConsole();
    parse(html: string): string[] {
        const dom = new JSDOM(html);
        const doc = dom.window.document;

        const description = doc.querySelectorAll(".description");

        if (!description) {
            this.logger.write("ERROR", `could not find any descriptions`);
        }

        return Array.from(description).map(el => el.textContent.replace(/\s+/g, ' ').trim());
    }
}

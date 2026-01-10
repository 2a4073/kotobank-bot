import { JSDOM } from "jsdom";

export class parseKotobankHTML {
    parse(html: string): string[] {
        const dom = new JSDOM(html);
        const doc = dom.window.document;

        const description = doc.querySelectorAll(".description");

        if (!description) {
            
        }

        return Array.from(description).map(el => el.textContent.replace(/\s+/g, ' ').trim());
    }
}

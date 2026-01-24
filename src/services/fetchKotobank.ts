import { fetchHTML } from "./fetchHTML";

export async function fetchKotobank(word: string) {
    const baseUrl = "https://kotobank.jp/word/";
    const url = baseUrl + encodeURIComponent(word);
    return await new fetchHTML().fetch(url);
}

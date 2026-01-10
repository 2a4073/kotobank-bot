interface fetch {
    fetch(url: string): Promise<string>;
}

export class fetchHTML implements fetch {
    async fetch(url: string) {
        if (!url) {
            throw new Error('URL was invalid.');
        }

        try {
            const res = await globalThis.fetch(url);

            if (!res.ok) {
                throw new Error(`Failed fetch "${url}".(${res.status}`);
            }

            return await res.text();
        } catch (e) {
            if (e instanceof Error) {
                throw new Error(e.message);
            } else {
                throw new Error(`Unknown error: ${e}`);
            }
        }
    }
}

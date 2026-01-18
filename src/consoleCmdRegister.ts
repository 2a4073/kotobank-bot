import "dotenv/config";;
import { RegisterGuildAllCommand } from "./discord/restAllCommands";
import { LoadCommand } from "./discord/commandLoader";

const TOKEN = process.env.DISCORD_BOT_TOKEN?.toString();
const CLIENT_ID = process.env.CLIENT_ID?.toString();
const GUILD_ID = process.env.TEST_GUILD_ID?.toString();

async function main(): Promise<void> {
    const registerer = new RegisterGuildAllCommand(TOKEN!, CLIENT_ID!, GUILD_ID!);
    const commandLoader = new LoadCommand();

    registerer.register(await commandLoader.load("/home/mjx829/work/kotobank-bot/src/discord/commands/"));
}

main();

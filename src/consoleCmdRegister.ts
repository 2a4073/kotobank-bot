import "dotenv/config";;
import { RegisterGuildAllCommand } from "./discord/restAllCommands";
import { LoadCommand } from "./discord/commandLoader";
import { CommandCollection, CommandLoader, CommandRegister } from "./discord/command.types";

const TOKEN = process.env.DISCORD_BOT_TOKEN?.toString();
const CLIENT_ID = process.env.CLIENT_ID?.toString();
const GUILD_ID = process.env.TEST_GUILD_ID?.toString();

async function main(): Promise<void> {
    const commandLoader: CommandLoader = new LoadCommand();
    const commands: CommandCollection = await commandLoader.load("/home/mjx829/work/kotobank/src/discord/commands/");
    const registerer: CommandRegister = new RegisterGuildAllCommand(TOKEN!, CLIENT_ID!, GUILD_ID!, commands);

    await registerer.register();
}

main();

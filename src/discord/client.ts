import { Client, GatewayIntentBits } from "discord.js";

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ]
});

client.on("clientReady", () => {
    if (!client.user) return;

    const timeOptions: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    };

    console.log(`[${new Intl.DateTimeFormat("ja-JP", timeOptions).format(new Date)}] Client was started as ${client.user.tag}`);
});

client.login(process.env.DISCORD_BOT_TOKEN);

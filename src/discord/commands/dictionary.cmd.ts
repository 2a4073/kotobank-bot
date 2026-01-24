import { Logger } from "@/services/logger.interface";
import { LogConsole } from "@/services/logger";
import { SlashCommandBuilder, ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import { CommandBase } from "../abstractCommand";
import { fetchKotobank } from "@/services/fetchKotobank";
import { parseKotobankHTML } from "@/services/parseHTML";

export default class DictionaryCommand extends CommandBase {
    private logger: Logger = new LogConsole();
    constructor() { super(); }

    public data = new SlashCommandBuilder()
        .setName("dictionary")
        .setDescription("コトバンクから語意を参照する．")
        .addStringOption(option => 
            option
                .setName("word")
                .setDescription("コトバンクで検索したい単語")
                .setRequired(true)
        ) as SlashCommandBuilder;

    async execute(interaction: ChatInputCommandInteraction): Promise<void> {
        const word = interaction.options.getString("word")?.toString();
        this.logger.write("DEBUG", `received "${word}".`);

        try {
            if (!word) {
                this.logger.write("ERROR", `${word} is not applicated.`);
                throw new Error(`word is not applicated.`);
            }

            await interaction.reply({
                content: "Searching...",
                withResponse: true
            });

            const fetchedMeans = await this.fetchWord(word);
            let means: string = "";

            for (let i = 0; i < fetchedMeans.length; i++) {
                const meansToSend = means + `**(${i + 1})** ${fetchedMeans[i]}\n\n`;
                if (meansToSend.length > 4000) {
                    means += `文字数の制限超過の為，以後略．`;
                    break;
                } else if (meansToSend.length === 0) {
                    means = "検索に失敗しました．";
                    break;
                }
                means = meansToSend;
            }

            this.logger.write("DEBUG", `fetched means: ${means}`);

            const embed = new EmbedBuilder()
                .setTitle(word)
                .setDescription(means)
                .setColor(0x122C52)
                .setTimestamp();

            await interaction.editReply({
                content: '',
                embeds: [embed],
            });
        } catch (e) {
            if (e instanceof Error) {
                this.logger.write("ERROR", e.toString());
                throw e;
            } else {
                throw e;
            }
        }
    }

    async fetchWord(word: string): Promise<string[]> {
        const HTML = await fetchKotobank(word);
        const descriptions = new parseKotobankHTML().parse(HTML);

        return descriptions;
    }
}

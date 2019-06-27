import { Message } from "discord.js";
import search from "yt-search";

import { GuildMember } from "../../../Database/Entities/GuildMember";
import { BaseCommand, IBaseCommand } from "../../../Utils/BaseCommand";
import { Logger } from "../../../Utils/Logger";
import { MusicPlayer } from "../../../Utils/MusicPlayer";
import { SpotifyCharts } from "../../../Utils/SpotifyCharts";

export class Command extends BaseCommand implements IBaseCommand {
    public Name = "trivia";
    public Description = "Start trivia.";
    public HasPermission(message: Message) {
        return true;
    }
    public async Run(message: Message) {
        const vc = message.member.voiceChannel;
        if (!vc) return message.channel.send("user not in vc");
        await message.channel.send("Starting music trivia...");

        const player = new MusicPlayer({ channel: vc });
        const connection = await player.Join();

        const spotify = new SpotifyCharts();

        const track = await spotify.GetRandomOffCharts();
        Logger.info(`now playing ${track.title} by ${track.artist}`);
        search(`${track.title} ${track.artist}`, (err, result) => {
            if (err) return;
            const t = result.videos[0];
            const formattedTitle = `${track.title} ${track.artist}`;
            player.Play(t.url);

            const collector = message.channel.createMessageCollector((msg) => true);
            collector.on("collect", async (msg) => {
                if (formattedTitle.toLowerCase().indexOf(msg.content.trim().toLowerCase()) > -1) {
                    player.Stop();
                    const member = await GuildMember.findOne({ where: { Id: msg.member.id } });
                    if (!member) return;
                    member.TriviaWins++;
                    member.save();
                    message.channel.send(`${msg.author} won, guessed right on https://youtube.com${t.url}`);
                }
            });
        });
    }
}

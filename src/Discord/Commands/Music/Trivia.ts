import { CollectorFilter, Message, VoiceChannel } from "discord.js";
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
        await message.channel.send("Starting music trivia. To win, guess either the song title or artist.");

        const player = new MusicPlayer({ channel: vc });
        await player.Join();

        const spotify = new SpotifyCharts();
        const track = await spotify.GetRandomOffCharts();

        Logger.info(`now playing ${track.title} by ${track.artist}`);
        const result = await this.SearchYouTube(`${track.title} ${track.artist}`);

        const t = result.videos[0];
        const answer = `${track.title} ${track.artist}`;

        player.Play(t.url);

        const collector = message.channel.createMessageCollector(this.userIsInVC(vc));
        collector.on("collect", async (msg) => {
            if (this.isRightGuess(answer, msg)) {
                player.Stop();
                const member = await GuildMember.findOne({ where: { Id: msg.member.id } });
                if (!member) return;
                member.TriviaWins++;
                member.save();
                message.channel.send(`${msg.author} won, guessed right on https://youtube.com${t.url}`);
                collector.stop();
            }
        });
    }

    private userIsInVC(vc: VoiceChannel): CollectorFilter {
        return (msg: Message) => vc.members.some((x) => x.id === msg.author.id);
    }

    private async SearchYouTube(keyword: string): Promise<IYouTubeResult> {
        return new Promise((resolve, reject) => {
            search(keyword, (err, res: IYouTubeResult) => {
                if (err) return reject(err);
                else return resolve(res);
            });
        });
    }
    private isRightGuess(answer: string, msg: Message) {
        return answer.toLowerCase().indexOf(msg.content.trim().toLowerCase()) > -1;
    }
}

interface IYouTubeResult {
    videos: IYouTubeVideo[];
}

interface IYouTubeVideo {
    url: string;
}

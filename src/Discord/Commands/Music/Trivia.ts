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
        // User shouldn't be able to play if they aren't in a voicechannel.
        const vc = message.member.voiceChannel;
        if (!vc) return message.channel.send("user not in vc");
        await message.channel.send("Starting music trivia. To win, guess either the song title or artist.");

        // Initialize the music player to prepare for playing.
        const player = new MusicPlayer({ channel: vc });
        await player.Join();

        // Fetch a random song off the spotify charts.
        const spotify = new SpotifyCharts();
        const track = await spotify.GetRandomOffCharts();
        const answer = `${track.title} ${track.artist}`;

        Logger.info(`now playing ${track.title} by ${track.artist}`);
        const result = await this.SearchYouTube(`${track.title} ${track.artist}`);

        const ytVideo = result.videos[0];
        player.Play(ytVideo.url);

        const collector = message.channel.createMessageCollector(this.userIsInVC(vc));
        collector.on("collect", async (msg) => {
            // If the user is right, stop playing, add a win to the users object, and let everyone know who won, and with which song.
            if (this.isRightGuess(answer, msg)) {
                player.Stop();
                const member = await GuildMember.findOne({ where: { Id: msg.member.id } });
                if (!member) return;
                member.TriviaWins++;
                member.save();
                message.channel.send(`${msg.author} won, guessed right on https://youtube.com${ytVideo.url}`);
                collector.stop();
            }
        });
    }

    /**
     *
     * @param vc The voice channel to check in
     * @description Helper to check if the user who sent a message is in the voicechannel.
     */
    private userIsInVC(vc: VoiceChannel): CollectorFilter {
        return (msg: Message) => vc.members.some((x) => x.id === msg.author.id);
    }

    /**
     *
     * @param keyword search string
     * @description Wrapper around the shitty callback provided by yt-search.
     */
    private async SearchYouTube(keyword: string): Promise<IYouTubeResult> {
        return new Promise((resolve, reject) => {
            search(keyword, (err, res: IYouTubeResult) => {
                if (err) return reject(err);
                else return resolve(res);
            });
        });
    }

    // TODO: this could be improved further to avoid incomplete answers.
    private isRightGuess(answer: string, msg: Message) {
        return answer.toLowerCase().indexOf(msg.content.trim().toLowerCase()) > -1;
    }
}

interface IYouTubeResult {
    videos: IYouTubeVideo[];
}

interface IYouTubeVideo {
    url: string;
    title: string;
    videoId: string;
    seconds: number;
    timestamp: string;
    duration: IDuration;
    ago: string;
    views: number;
    author: IAuthor;
}
export interface IDuration {
    seconds: number;
    timestamp: string;
}

export interface IAuthor {
    name: string;
    id: string;
    url: string;
    userId: string;
    userName: string;
    userUrl: string;
    channelId: string;
    channelName: string;
    channelUrl: string;
}

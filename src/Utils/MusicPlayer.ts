import { VoiceChannel, VoiceConnection } from "discord.js";
import ytdl from "ytdl-core-discord";

export class MusicPlayer {
    private channel: VoiceChannel;
    private connection: VoiceConnection;
    constructor(opts: IMusicPlayerOptions) {
        this.channel = opts.channel;
    }
    public async Join(): Promise<VoiceConnection> {
        const connection = await this.channel.join();
        this.connection = connection;
        return connection;
    }
    public Leave() {
        return this.channel.leave();
    }

    public async Play(url: string) {
        this.connection.playOpusStream(await ytdl(url));
    }
    public async Stop() {
        this.connection.disconnect();
    }
}

export interface IMusicPlayerOptions {
    channel: VoiceChannel;
}

import { Client, ClientOptions } from "discord.js";
export class Application extends Client {
    constructor(options: DClientOptions) {
        super(options);
        this.CommandDirectory = options.commandDirectory;
    }

    public CommandDirectory: string;
}

interface DClientOptions extends ClientOptions {
    avatarUrl: string;
    commandDirectory: string;
}

import { Client, ClientOptions } from "discord.js";
import readdirp from "readdirp";

import { IBaseCommand } from "./BaseCommand";
import { MusicPlayer } from "./MusicPlayer";

export class Application extends Client {
    /**
     * @property {IBaseCommand[]} Commands - Cache of all commands
     */
    public Commands: IBaseCommand[];

    /**
     * @property {string} Prefix - Bot's prefix
     */
    public Prefix: string;

    /**
     * @property {boolean} Ready - Whether or not the client is ready to execute commands
     */
    public Ready: boolean;

    /**
     * @property {string} CommandDirectory - Where all commands are located
     */
    private CommandDirectory: string;

    constructor(options: IDClientOptions) {
        super(options);

        // We don't care if it fails.
        // tslint:disable
        try {
            this.user.setAvatar(options.avatarUrl);
        } catch {}
        // tslint:enable
        this.CommandDirectory = options.commandDirectory;
        this.Prefix = options.prefix;
        this.Ready = false;
    }

    /**
     * @returns {Promise<void>}
     */
    public async CacheCommands() {
        const commands: IBaseCommand[] = [];
        // tslint:disable-next-line
        for await (const file of readdirp(this.CommandDirectory, { fileFilter: (file) => file.basename.endsWith(".js") })) {
            if (file.path === "Index.js") continue;
            const { Command } = await import(file.fullPath);
            commands.push(new Command(this));
        }
        this.Commands = commands;
        this.Ready = true;
    }

    /**
     *
     * @param {string} name - command name (case insensitive)
     */
    public GetCommandByName(name: string): IBaseCommand {
        return this.Commands.filter((x) => x.Name.toLowerCase() === name.toLowerCase())[0] || null;
    }
}

interface IDClientOptions extends ClientOptions {
    avatarUrl: string;
    commandDirectory: string;
    prefix: string;
}

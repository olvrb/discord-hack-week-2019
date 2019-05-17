import { Client, ClientOptions } from "discord.js";
import readdirp from "readdirp";

import { IBaseCommand } from "./BaseCommand";

export class Application extends Client {
    constructor(options: DClientOptions) {
        super(options);

        // We don't care if it fails.
        try {
            this.user.setAvatar(options.avatarUrl);
        } catch {}
        this.CommandDirectory = options.commandDirectory;
        this.Prefix = options.prefix;
        this.Ready = false;
    }

    /**
     * @property {string} CommandDirectory - Where all commands are located
     */
    private CommandDirectory: string;

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
     * @returns {Promise<void>}
     */
    public async CacheCommands() {
        for await (const file of readdirp(this.CommandDirectory, { fileFilter: (file) => file.basename.endsWith(".js") })) {
            if (file.path === "Index.js") continue;
            let { Command } = await import(file.fullPath);
            this.Commands.push(new Command());
        }
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

interface DClientOptions extends ClientOptions {
    avatarUrl: string;
    commandDirectory: string;
    prefix: string;
}

import { Client, ClientOptions } from "discord.js";
import { Command } from "../Discord/Commands/Moderation/Kick";
import { IBaseCommand } from "./BaseCommand";
import readdirp from "readdirp";
export class Application extends Client {
    constructor(options: DClientOptions) {
        super(options);
        this.CommandDirectory = options.commandDirectory;
        this.Prefix = options.prefix;
        this.Ready = false;
    }

    public CommandDirectory: string;

    public Commands: IBaseCommand[];

    public Prefix: string;

    public Ready: boolean;

    public async CacheCommands() {
        const commands: IBaseCommand[] = [];
        for await (const file of readdirp(this.CommandDirectory, { fileFilter: (file) => file.basename.endsWith(".js") })) {
            if (file.path === "Index.js") continue;
            let { Command } = await import(file.fullPath);
            commands.push(new Command());
        }
        this.Commands = commands;
        this.Ready = true;
    }
    public GetCommandByName(name: string): IBaseCommand {
        return this.Commands.filter((x) => x.Name === name)[0] || null;
    }
}

interface DClientOptions extends ClientOptions {
    avatarUrl: string;
    commandDirectory: string;
    prefix: string;
}

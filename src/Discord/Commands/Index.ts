import { Message } from "discord.js";

import { Application } from "../../Utils/Application";

export function ParseMessage(message: Message, prefix: string): { commandName: string; args: string[]; startsWithPrefix: boolean } {
    const args = message.content
        .slice(prefix.length)
        .trim()
        .split(" ");
    const commandName = args.shift();

    const startsWithPrefix = message.content.startsWith(prefix);

    return {
        commandName: commandName || "",
        args,
        startsWithPrefix
    };
}

export async function HandleMessage(app: Application, message: Message) {
    // Ignore bots.
    if (message.author.bot) return;

    // Cache commands in case it was missed during startup.
    if (!app.Ready) return message.reply("Not ready.");

    // Extract some info from the message
    const { commandName, args, startsWithPrefix } = ParseMessage(message, app.Prefix);
    if (!startsWithPrefix) return;

    // Fetch command from cache.
    const command = app.GetCommandByName(commandName);
    if (!command) return;

    // Run the HasPermission method to check if the author has permission to run the command.
    if (command.HasPermission(message)) {
        command.Run(message);
    }
}

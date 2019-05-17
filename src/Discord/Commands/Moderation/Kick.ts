import { Message } from "discord.js";

import { BaseCommand, IBaseCommand } from "../../../Utils/BaseCommand";
import { EmbedBuilder } from "../../../Utils/EmbedBuilder";

export class Command extends BaseCommand implements IBaseCommand {
    public Name = "kick";
    public Description = "Kick a member.";
    public HasPermission(message: Message) {
        return true;
    }
    public async Run(message: Message) {
        const embed = new EmbedBuilder({
            title: "test",
            description: "test" + this.Application.user.username
        }).BuildEmbed({
            type: EmbedBuilder.EmbedType.Info
        });
        await message.channel.send(embed);
    }
}

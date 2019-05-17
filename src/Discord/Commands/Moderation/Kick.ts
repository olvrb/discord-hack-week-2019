import { Message } from "discord.js";

import { IBaseCommand } from "../../../Utils/BaseCommand";
import { EmbedBuilder } from "../../../Utils/EmbedBuilder";

export class Command implements IBaseCommand {
    public Name = "kick";
    public Description = "Kick a member.";
    public HasPermission(message: Message) {
        return true;
    }
    public Run(message: Message) {
        console.log("running");
        const embed = new EmbedBuilder({
            title: "test",
            description: "test"
        }).BuildEmbed({
            type: EmbedBuilder.EmbedType.Info
        });
        message.channel.send(embed);
    }
}

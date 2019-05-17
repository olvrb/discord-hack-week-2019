import { IBaseCommand } from "../../../Utils/BaseCommand";
import { Message } from "discord.js";
import { EmbedBuilder, EmbedType } from "../../../Utils/EmbedBuilder";

export class Command implements IBaseCommand {
    public Name = "kick";
    public Description = "Kick a member.";
    public HasPermission(message: Message) {
        return true;
    }
    public Run(message: Message) {
        console.log("running");
        const embed = new EmbedBuilder().BuildEmbed({
            description: "test",
            title: "test",
            type: EmbedBuilder.EmbedType.Info
        });
        message.channel.send(embed);
    }
}

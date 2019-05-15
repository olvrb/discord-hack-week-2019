import { IBaseCommand } from "../../../Utils/BaseCommand";
import { Message } from "discord.js";

export class Command implements IBaseCommand {
    public Name = "kick";
    public Description = "Kick a member.";
    public HasPermission(message: Message) {
        return true;
    }
    public Run(message: Message) {
        console.log("running");

        message.channel.send("Kicked");
    }
}

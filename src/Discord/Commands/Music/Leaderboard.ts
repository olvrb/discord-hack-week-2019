import { Message } from "discord.js";
import { GuildMember } from "../../../Database/Entities/GuildMember";
import { User } from "../../../Database/Entities/User";
import { BaseCommand, IBaseCommand } from "../../../Utils/BaseCommand";

export class Command extends BaseCommand implements IBaseCommand {
    public Name = "leaderboard";
    public Description = "Fetch the leaderboard for wins in musi trivia.";
    public HasPermission() {
        return true;
    }
    public async Run(message: Message) {
        const members = await GuildMember.find({ where: { Guild: { Id: message.guild.id } } });
        members.sort((a, b) => (a.TriviaWins < b.TriviaWins ? 1 : -1));
        await message.channel.send(members.map((x) => `${this.Application.users.get(x.Id)!.tag} - ${x.TriviaWins} wins`).join("\n"));
    }
}

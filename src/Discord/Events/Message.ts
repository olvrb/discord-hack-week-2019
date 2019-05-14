import { Message } from "discord.js";
import { Guild } from "../../Database/Entities/Guild";
import { Logger } from "../../Utils/Logger";
import { GuildMember } from "../../Database/Entities/GuildMember";
import { User } from "../../Database/Entities/User";

export async function OnMessage(message: Message) {
    const dbGuild = await Guild.CreateOrUpdate(message.guild);
    Logger.info(`Added or updated guild ${dbGuild.Id} to the database.`);

    const dbUser = await User.CreateOrUpdate(message.author);
    Logger.info(`Added or updated user ${dbUser.Id} to the database.`);

    if (message.member) {
        const dbMember = await GuildMember.CreateOrUpdate(message.member, dbGuild);
        Logger.info(`Added or updated member ${dbMember.Id} to the database.`);
    }
}

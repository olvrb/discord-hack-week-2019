import { Message as DMessage } from "discord.js";

import { Guild } from "../../Database/Entities/Guild";
import { GuildMember } from "../../Database/Entities/GuildMember";
import { Message } from "../../Database/Entities/Message";
import { User } from "../../Database/Entities/User";
import { Logger } from "../../Utils/Logger";
import { HandleMessage } from "../Commands/Index";
import { getApp } from "../Index";

export async function OnMessage(message: DMessage) {
    const dbGuild = await Guild.CreateOrUpdate(message.guild);
    Logger.info(`Added or updated guild ${dbGuild.Id} to the database.`);

    const dbMessage = await Message.CreateOrUpdate(message);
    Logger.info(`Added or updated message ${dbMessage.Id} to the database.`);

    const dbUser = await User.CreateOrUpdate(message.author);
    Logger.info(`Added or updated user ${dbUser.Id} to the database.`);

    if (message.member) {
        const dbMember = await GuildMember.CreateOrUpdate(message.member, dbGuild);
        Logger.info(`Added or updated member ${dbMember.Id} to the database.`);
    }

    HandleMessage(getApp(), message);
}
